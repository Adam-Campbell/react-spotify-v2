import React from 'react';
import PropTypes from 'prop-types';
import CDIcon from '../../images/cd-icon.jpg';
import GroupIcon from '../../images/group-icon.jpg';

const getImageURL = (passedURL, isArtist) => {
    if (passedURL === '') {
        return isArtist ? GroupIcon : CDIcon;
    }
    return passedURL;
}

export const HeaderImage = ({ imageURL, imageAlt, imageRef, isArtist }) => (
    <img 
        className="header-image"
        src={getImageURL(imageURL, isArtist)}
        alt={imageAlt}
        ref={imageRef}
    />
);

HeaderImage.propTypes = {
    imageURL: PropTypes.string.isRequired,
    imageAlt: PropTypes.string.isRequired,
    imageRef: PropTypes.object.isRequired,
    isArtist: PropTypes.bool.isRequired
};
