import React from 'react';
import PropTypes from 'prop-types';
import DataPreFetcher from './DataPreFetcher';
import CardImage from '../CardImage';
import { collectionTypes } from '../../constants';
import './card.scss';
import { CardLoader } from '../Loaders';

/**
 * A card component to be used outside of the Carousel component, requiring data prefetching functionality, but
 * not interaction validation functionality.
 */
export const Card = ({ linkDestination, label, additionalLabel, imageURL, itemId, collectionType }) => (
    <DataPreFetcher
        itemId={itemId}
        collectionType={collectionType}
        linkDestination={linkDestination}
    >
        {({ handleInteractionEnd, imageRef, isFetching }) => (
            <a 
                href={linkDestination} 
                className="card" 
                onClick={(e) => {
                    e.preventDefault();
                    handleInteractionEnd();
                }}
            >
                <CardImage 
                    imageURL={imageURL}
                    isArtist={collectionType === collectionTypes.artists}
                    containerRef={imageRef}
                />
                <p className="card__label">{label}</p>
                {additionalLabel && <p className="card__additional-label">{additionalLabel}</p>}
                {isFetching && <CardLoader />}
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