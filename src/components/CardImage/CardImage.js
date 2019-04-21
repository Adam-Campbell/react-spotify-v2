import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CDIcon from '../../images/cd-icon.jpg';
import GroupIcon from '../../images/group-icon.jpg';

export class CardImage extends Component {

    static propTypes = {
        imageURL: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired,
        containerRef: PropTypes.object,
    }

    image = new Image();

    state = {
        imageLoaded: false
    }

    componentDidMount() {
        const { imageURL } = this.props;
        this.image.addEventListener('load', this.confirmImageLoaded);
        this.image.src = imageURL;
    }

    componentWillUnmount() {
        this.image.removeEventListener('load', this.confirmImageLoaded);
    }

    confirmImageLoaded = () => {
        this.setState({
            imageLoaded: true
        });
    }

    render() {
        const { imageLoaded } = this.state;
        const { imageURL, isArtist, containerRef } = this.props;
        return (
            <figure 
                className="card-image"
                ref={containerRef}
            >
                <img 
                    src={isArtist ? GroupIcon : CDIcon} 
                    alt={
                        isArtist ? 'An icon representing a musician' :
                        'An icon representing an album or playlist'
                    }
                    className="card-image__fallback"
                />
                <img 
                    src={imageURL}
                    alt=""
                    className={`card-image__main ${!imageLoaded ? 'hide-image' : ''}`}
                />
            </figure>
        );
    }
}
