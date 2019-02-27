import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CDIcon from '../../cd-icon.jpg';
import GroupIcon from '../../group-icon.jpg';

export class SmartImage extends Component {

    static propTypes = {
        imageURL: PropTypes.string.isRequired,
        isArtist: PropTypes.bool.isRequired,
        isFixedSize: PropTypes.bool.isRequired,
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
        const { imageURL, isArtist, isFixedSize, containerRef } = this.props;
        return (
            <figure 
                className={`smart-image ${isFixedSize ? 'smart-image--fixed' : 'smart-image--fluid'}`}
                ref={containerRef}
            >
                <img 
                    src={isArtist ? GroupIcon : CDIcon} 
                    alt={
                        isArtist ? 'An icon representing a musician' :
                        'An icon representing an album or playlist'
                    }
                    className="smart-image__fallback"
                />
                <img 
                    src={imageURL}
                    alt=""
                    className={`smart-image__main ${!imageLoaded ? 'hide-image' : ''}`}
                />
            </figure>
        );
    }
}
