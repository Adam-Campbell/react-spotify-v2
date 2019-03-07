import React from 'react';
import PropTypes from 'prop-types';
import DataPreFetcher from './DataPreFetcher';
import SmartImage from '../SmartImage';
import { collectionTypes } from '../../constants';
import './card.scss';

export const Card = ({ linkDestination, label, additionalLabel, imageURL, itemId, collectionType }) => (
    <DataPreFetcher
        itemId={itemId}
        collectionType={collectionType}
        linkDestination={linkDestination}
    >
        {({ handleInteractionEnd, imageRef }) => (
            <a 
                href={linkDestination} 
                className="card" 
                onClick={(e) => {
                    e.preventDefault();
                    handleInteractionEnd();
                }}
            >
                <SmartImage 
                    imageURL={imageURL}
                    isArtist={collectionType === collectionTypes.artists}
                    isFixedSize={false}
                    containerRef={imageRef}
                />
                <p className="card__label">{label}</p>
                {additionalLabel && <p className="card__additional-label">{additionalLabel}</p>}
            </a>
        )}
    </DataPreFetcher>
);

Card.propTypes = {
    linkDestination: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    additionalLabel: PropTypes.string,
    imageURL: PropTypes.string.isRequired,
    itemId: PropTypes.string.isRequired,
    collectionType: PropTypes.oneOf([
        collectionTypes.artists, 
        collectionTypes.albums, 
        collectionTypes.playlists,
        collectionTypes.categories
    ]),
};