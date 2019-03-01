import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import TouchCard from '../TouchCard';

/*
__________
__________
  README
__________
__________


This component has just been ported directly over from a seperate project where I created a minimal demo 
version of what I am looking to create. There are various things that need to change. 

- Styles need to be added. 

- The TouchCard component that is rendered by this component doesn't exist in this project, adjust to work 
with the card components I am using in this project. 

- Move VelocityTracker class into its own file. 

- Look into more precise algorithms for modelling the velocity decay after a swipe has completed. 

- Look into improving the velocity calculations in general. 

- Look into using requestAnimationFrame for all updates to the content containers translateX value 
(currently just updating it as often as the JS engine will allow but limiting to once a frame with
requestAnimationFrame will improve performance).


Related - the card components will have to be altered to have an active state that becomes true when
an 'interaction' begins (mouseDown or touchStart event occurs on the card), but is then set to false once
a certain amount of horizontal (and maybe vertical) movement has occured. See the TouchCard component in
example project for the minimal implementation of this. 

Crucially, with the cards in this project, I need to only trigger the cards data fetching and redirect
functionality when a touchEnd or mouseUp event occurs on the card AND the card is currently active. This
means if a card is interacted with and then dragged around, then data fetching and redirecting will not 
be triggered when the interaction ends. 


*/







/*

- Needs to render a list of cards. 

- Should the array of card components be passed to this component, or should the data used to construct the card
components be passed to this component, and then this component can map over the data to generate the card 
components?

- Needs to support mouse and touch events.

- There will be arrows at either side that can be clicked, that will scroll the carousel along in that direction. 

- For touch events, a 'drag' in a particular direction will move the carousel in that direction. 


*/




/*

Touch issue - If I don't use preventDefault() on the touch events, scrolling is incredibly janky because it
is constantly moving up and down ever so slightly (the natural page scroll functionality is kicking in). 

However if I just call preventDefault on every invocation of the touch move handler, scrolling will become 
difficult because the only way to scroll up or down the page will be to use the gaps in between the carousels.

So, I need to find a way to conditionally call preventDefault only when the user is purposefully side scrolling. 

One solution could be to set a flag once the user has scrolled to the left or right by, say, 25px. And once that
flag is turned on, preventDefault will be called for each invocation for the rest of the interaction. This gives
the user a 50px 'cushion' for being able to scroll vertically down the page. 

Looking at the netflix app, they have it set up so that once you start scrolling horizontally, you can no longer
scroll vertically for the rest of that interaction, and vice versa. I could adopt a similar approach .


*/


class VelocityTracker {
    coords = [null, null, null];

    addCoord = (coord, timestamp) => {
        const newCoord = {
            coord,
            timestamp
        };
        this.coords = [ ...this.coords.slice(1), newCoord ];
    }

    /**
     * Will return 0 if 3 coords have not yet been recorded, or if the x direction that each successive
     * coord is travelling in is not the same. However if 3 coords have been recorded and the direction 
     * is the same, it will return the average distance travelled between each coord. A positive number
     * represents movement to the right, and a negative number represents movement to the left. 
     */
    getVelocity = () => {

        for (let coord of this.coords) {
            if (coord === null) {
                return 0;
            }
        }

        const firstSign = Math.sign(this.coords[1].coord - this.coords[0].coord);
        const secondSign = Math.sign(this.coords[2].coord - this.coords[1].coord);
        if (
            (firstSign === 1 && secondSign === 1) ||
            (firstSign === -1 && secondSign === -1)
        ) {
            // Calculate the velocity of the swipe at its end (in px per ms), and multiply by 
            // 16.7 to get approx distanced travelled per frame @ 60fps.
            const distance = this.coords[2].coord - this.coords[1].coord;
            const time = this.coords[2].timestamp - this.coords[1].timestamp;
            return (distance / time) * 16.7;
        } else {
            return 0;
        }
    }

    getCoords = () => {
        return this.coords;
    }
}


/*

When swipe has finished, use velocityTracker to get the final velocity of the swipe. 

Then set up a requestAnimationFrame call, passing in the velocity, and altering the translateX of the 
container by that velocity. Then multiply the velocity by 0.6, and call requestAnimationFrame again. 
Keep calling requestAnimationFrame until the velocity goes below 1.


*/



class Carousel extends Component {

    static propTypes = {
        cardData: PropTypes.arrayOf(PropTypes.object),
        title: PropTypes.string.isRequired
    };

    state = {
        contentContainerOffset: 0,
        isActive: false,
        startX: null,
        startY: null,
        startOffset: null,
        dragOrientation: null,
        adjustedStartX: null,
    };

    velocityTracker = new VelocityTracker();

    contentContainerRef = React.createRef();

    getContainerWidth = (numberOfCards) => {
        return `${numberOfCards * 200}px`;
    }

    getTranslateValAsNum = (str) => {
        if (!str) {
            return 0;
        }
        const regex = /^(translateX\()([-.0-9]+)(px\))$/;
        const numStr = str.replace(regex, '$2');
        return parseFloat(numStr);
    }

    setContainerTransform = (translateNum) => {
        if (this.contentContainerRef.current) {
            this.contentContainerRef.current.style.transform = `translateX(${translateNum}px)`;
        }
    }

    handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        this.handleInteractionStart(clientX, clientY);
    }

    handleMouseMove = (e) => {
        if (this.state.isActive) {
            // preventDefault() prevents the text within the cards from being selected whilst trying to drag
            // the carousel.
            e.preventDefault();
            const { clientX } = e;
            const { startX } = this.state;
            this.handleInteractionUpdate(clientX, startX);
        }
    }

    handleTouchStart = (e) => {
        const { clientX, clientY } = e.targetTouches[0];
        this.handleInteractionStart(clientX, clientY);
    }

    /*
        If dragOrientation has already been set to horizontal for the current interaction, calls the
        handleInteractionUpdate method. If dragOrientation hasn't been set yet, it will keep checking the
        current clientX and clientY until a condition is met to determine that the dragOrientation is either
        horizontal or vertical. Finally, if the orientation is vertical then this method does absolutely
        nothing for the remainder of the current interaction.
    */
    handleTouchMove = (e) => {
        const { isActive, startX, startY, dragOrientation } = this.state;
        if (dragOrientation === 'horizontal') {
            e.preventDefault();
            const { clientX } = e.targetTouches[0];
            const { adjustedStartX } = this.state;
            this.handleInteractionUpdate(clientX, adjustedStartX);
        } else if (isActive && !dragOrientation) {
            const { clientX, clientY } = e.targetTouches[0];
            const absDeltaX = Math.abs(clientX - startX);
            const absDeltaY = Math.abs(clientY - startY);
            if (absDeltaX >= 3) {
                this.setState({
                    adjustedStartX: clientX,
                    dragOrientation: 'horizontal'
                });
            } else if (absDeltaY >= 3) {
                this.setState({
                    dragOrientation: 'vertical'
                });
            }
        }
    }


    handleInteractionStart = (clientX, clientY) => {
        const offsetString = this.contentContainerRef.current && 
                             this.contentContainerRef.current.style.transform;
        const offsetNum = this.getTranslateValAsNum(offsetString);
        this.setState({
            isActive: true,
            startX: clientX,
            startY: clientY,
            startOffset: offsetNum
        });
    }

    /*
        Determine the x position of the current event relative to the start of the interaction.
        Take the delta, apply that delta to the offset from the start of the interaction, and then set
        this as the new offset value. 
    */
    handleInteractionUpdate = (clientX, startX) => {
        const { startOffset } = this.state;
        const xDelta = clientX - startX;
        const newOffset = startOffset + xDelta;
        // now constrain the offset
        const containerWidth = this.props.cardData.length * 200;
        const { clientWidth } = document.documentElement;
        const lowerBound = -(containerWidth - clientWidth);
        const constrainedOffset = Math.max(Math.min(0, newOffset), lowerBound);
        // this.setState({
        //     contentContainerOffset: constrainedOffset
        // }); 
        this.setContainerTransform(constrainedOffset);
        this.velocityTracker.addCoord(constrainedOffset, performance.now());
    }

    handleInteractionEnd = () => {
        if (this.state.isActive) {
            this.setState({
                isActive: false, 
                startX: null,
                startY: null,
                startOffset: null,
                dragOrientation: null,
                adjustedStartX: null
            });
            const velocity = this.velocityTracker.getVelocity();
            requestAnimationFrame(timestamp => {
                this.createPostSwipeFrame(timestamp, velocity);
            });
        }
    }

    createPostSwipeFrame = (timestamp, velocity) => {
        if (Math.abs(velocity) >= 1) {
            const nextVelocity = velocity * 0.9;
            const prevTranslate = this.getTranslateValAsNum(
                this.contentContainerRef.current.style.transform
            );
            const adjustedTranslate = prevTranslate + nextVelocity;
            const containerWidth = this.props.cardData.length * 200;
            const { clientWidth } = document.documentElement;
            const limit = -(containerWidth - clientWidth);
            const constrainedTranslate = Math.min(0, Math.max(adjustedTranslate, limit));
            this.contentContainerRef.current.style.transform = `translateX(${constrainedTranslate}px)`;
            requestAnimationFrame(timestamp => {
                this.createPostSwipeFrame(timestamp, nextVelocity);
            });
        }
    }

    render() {
        const { cardData, title } = this.props;
        const { contentContainerOffset } = this.state;
        const containerWidth = this.getContainerWidth(cardData.length);
        return (
            <section className="card-collection">
                <h1 className="card-collection__title">{title}</h1>
                <div 
                    className="carousel"
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleInteractionEnd}
                    onMouseLeave={this.handleInteractionEnd}
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleInteractionEnd}
                >
                    <div 
                        className="carousel__content-container" 
                        style={{ 
                            width: containerWidth
                        }}
                        ref={this.contentContainerRef}
                    >
                        {cardData.map(card => (
                            <TouchCard 
                                key={card.id}
                                name={card.name}
                                imageURL={card.imageURL}
                            />
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default Carousel;
