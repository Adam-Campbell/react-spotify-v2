import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import VelocityTracker from './VelocityTracker';
import CarouselCardCollection from '../CarouselCardCollection';
import { collectionTypes } from '../../constants';


export class Carousel extends Component {

    static propTypes = {
        itemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        title: PropTypes.string.isRequired,
        collectionType: PropTypes.oneOf([
            collectionTypes.artists, 
            collectionTypes.albums, 
            collectionTypes.playlists,
            collectionTypes.categories
        ]),
        includeCreatePlaylistCard: PropTypes.bool.isRequired
    };

    state = {
        // is there a currently active interaction
        isActive: false,
        // clientX at the start of current interaction
        startX: null,
        // clientY at the start of current interaction
        startY: null,
        // the numerical value from within the transform: translateX inline style on the contentContainer node
        // at the start of the current interaction.
        startOffset: null,
        // Used for touch events only, will either be equal to null, 'horizontal' or 'vertical'. Allows the 
        // component to know which actions it needs to take during touchmove events.
        dragOrientation: null,
        // Used for touch events only. In order to determine whether the current 'swipe' should be classed as 
        // horizontal or vertical, a small buffer of 3px in each direction for the origin point is used. This 
        // means that by the time a swipe is identified as horizontal, it is either 3px greater or lesser than
        // the startX value. To avoid a small jump when the first update of the component occurs, we store this
        // adjusted clientX value in adjustedStartX and then use this value rather than startX for touch events.
        adjustedStartX: null,
    };

    velocityTracker = new VelocityTracker();

    contentContainerRef = React.createRef();
    interactionUpdateRAF = null;
    postSwipeRAF = null;

    componentWillUnmount = () => {
        // In the event that there is still an animation frame saved in either of these variables, cancel it.
        cancelAnimationFrame(this.interactionUpdateRAF);
        cancelAnimationFrame(this.postSwipeRAF);
    }

    /**
     * Takes the string value for the inline style 'transform' on the contentContainerRef node, which will be
     * either an empty string (if it hasn't been set yet), or a string in the format 'translateX(${some_num}px)'.
     * In the event of an empty string, the function just returns 0. If the string is not an empty string, the
     * function uses regex to grab the numeric value from within the string and returns it. 
     * @param {String} str - the inline style string
     * @returns {Number} - a floating point value representing the numeric value from within the input string.
     */
    getTranslateValAsNum = (str) => {
        if (!str) {
            return 0;
        }
        // the numeric value could be positive or negative, and could be an integer or floating point.
        const regex = /^(translateX\()([-.0-9]+)(px\))$/;
        const numStr = str.replace(regex, '$2');
        return parseFloat(numStr);
    }

    /**
     * Grabs the clientX and clientY values from the event object and calls the handleInteractionStart
     * method.
     */
    handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        this.handleInteractionStart(clientX, clientY);
    }

    /**
     * Called on every mouseMove event. Manages calling the handleInteractionUpdate method with the up to date 
     * clientX property from the latest event object. The handleInteractionUpdate method is called within 
     * requestAnimationFrame to prevent layout thrashing. If the previous requestAnimationFrame call has not been 
     * executed by the time the current one is ready to go, then the previous one is cancelled. 
     */
    handleMouseMove = (e) => {
        if (this.state.isActive) {
            e.preventDefault();
            const { clientX } = e;
            const { startX, startOffset } = this.state;
            if (this.interactionUpdateRAF) {
                cancelAnimationFrame(this.interactionUpdateRAF);
            }
            this.interactionUpdateRAF = requestAnimationFrame(() => {
                this.handleInteractionUpdate(clientX, startX, startOffset);
                this.interactionUpdateRAF = null;
            });
        }
    }

    /**
     * Grabs the clientX and clientY properties from the event object and calls the handleInteractionStart 
     * method.
     */
    handleTouchStart = (e) => {
        const { clientX, clientY } = e.targetTouches[0];
        this.handleInteractionStart(clientX, clientY);
    }

    /**
     * Called on every touchmove event. Handles managing which, if any method should be called, depending on
     * the value of dragOrientation. If null, then the orientation of the current drag has not yet been 
     * calculated, so it simply calculates the orientation of the drag. If the value is 'vertical', then nothing
     * needs to be done. If the value is 'horizontal', then preventDefault is called to stop vertical scrolling
     * of the window occuring, and the management of the requestAnimationFrame and the calling of
     * handleInteractionUpdate occurs.
     */
    handleTouchMove = (e) => {
        if (this.state.isActive) {
            const { startX, startY, dragOrientation, startOffset } = this.state;
            if (dragOrientation === 'horizontal') {
                e.preventDefault();
                const { clientX } = e.targetTouches[0];
                const { adjustedStartX } = this.state;
                if (this.interactionUpdateRAF) {
                    cancelAnimationFrame(this.interactionUpdateRAF);
                }
                this.interactionUpdateRAF = requestAnimationFrame(() => {
                    this.handleInteractionUpdate(clientX, adjustedStartX, startOffset);
                    this.interactionUpdateRAF = null;
                });
            } else if (!dragOrientation) {
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
    }

    /**
     * Contains all of the logic that needs to be executed at the start of an interaction. This method will be
     * called by either handleMouseDown or handleTouchStart, depending on the type of interface being used. 
     * @param {Number} clientX - the clientX value to use for calculations.
     * @param {Number} clientY - the clientY value to use for calculations.
     */
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

    /**
     * Contains all of the logic to be executed for each update of the current interaction. This method is
     * called by either handleMouseMove or handleTouchMove depending on the interface being used. It is only
     * ever called within a requestAnimationFrame call however, so at most it should run once every 16.7ms 
     * (approx), regardless of how often the handleMouseMove or handleTouchMove methods are called.
     * @param {Number} clientX - the clientX value to use, pulled from an event object.
     * @param {Number} startX - the startX value to use, pulled from component state.
     * @param {Number} startOffset - the startOffset value to use, pulled from component state. 
     */
    handleInteractionUpdate = (clientX, startX, startOffset) => {
        const xDelta = clientX - startX;
        const newOffset = startOffset + xDelta;
        // now constrain the offset
        const containerWidth = this.props.itemIds.length * 260;
        const { clientWidth } = document.documentElement;
        const lowerBound = -(containerWidth - clientWidth);
        
        // If lowerBound is non-negative, then the width of the content container is less than the current
        // width of the client. In this case we just use 0 as our final offset value since there shouldn't be
        // any offset on the container container. If lowerBound is negative however, then the content container
        // is wider than the client, so we derive the value for finalOffset from the value of newOffset, 
        // constrained to be in the range lowerBound <= finalOffset <= 0.
        let finalOffset;
        if (Math.sign(lowerBound) !== -1) {
            finalOffset = 0;
        } else {
            finalOffset = Math.max(Math.min(0, newOffset), lowerBound);
        }
        
        if (this.contentContainerRef.current) {
            this.contentContainerRef.current.style.transform = `translateX(${finalOffset}px)`;
        }
        this.velocityTracker.addCoord(finalOffset);
    }

    /**
     * Contains the logic to be executed at the end of an interaction. Will run when the following events occur:
     * mouseUp, mouseLeave, touchEnd.
     */
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

    /**
     * Called at the end of an interaction. Sets up the continued (but slowing) motion of the container after
     * an interaction has finished, based off of the velocity of that interaction just before its end. 
     */
    createPostSwipeFrame = (timestamp, velocity) => {
        if (Math.abs(velocity) >= 1) {
            const nextVelocity = velocity * 0.95;
            const prevTranslate = this.getTranslateValAsNum(
                this.contentContainerRef.current.style.transform
            );
            const adjustedTranslate = prevTranslate + nextVelocity;
            const containerWidth = this.props.itemIds.length * 260;
            const { clientWidth } = document.documentElement;
            const limit = -(containerWidth - clientWidth);
            const constrainedTranslate = Math.min(0, Math.max(adjustedTranslate, limit));
            this.contentContainerRef.current.style.transform = `translateX(${constrainedTranslate}px)`;
            this.postSwipeRAF = requestAnimationFrame(timestamp => {
                this.createPostSwipeFrame(timestamp, nextVelocity);
            });
        }
    }

    render() {
        const { itemIds, title, collectionType, includeCreatePlaylistCard } = this.props;
        const containerWidth = `${itemIds.length * 260}px`;
        return (
            <section className="carousel__section">
                <h1 className="carousel__title">{title}</h1>
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
                        <CarouselCardCollection 
                            itemIds={itemIds}
                            includeCreatePlaylistCard={includeCreatePlaylistCard}
                            collectionType={collectionType}
                        />
                    </div>
                </div>
            </section>
        );
    }
}

