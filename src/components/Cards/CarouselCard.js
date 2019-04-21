import React from 'react';
import PropTypes from 'prop-types';
import InteractionValidator from './InteractionValidator';
import DataPreFetcher from './DataPreFetcher';
import CardImage from '../CardImage';
import { collectionTypes } from '../../constants';
import './carouselCard.scss';
import { CardLoader } from '../Loaders';

/**
 * A card component to be used only within the Carousel component, it requires both interaction validation and
 * data prefetching functionality. 
 */
export const CarouselCard = ({ linkDestination, label, additionalLabel, imageURL, itemId, collectionType }) => (
    <InteractionValidator>
        {(ivProps) => (
            <DataPreFetcher
                itemId={itemId}
                collectionType={collectionType}
                linkDestination={linkDestination}
                shouldManageValidation={ivProps.shouldManageValidation}
                startMouseInteraction={ivProps.startMouseInteraction}
                updateMouseInteraction={ivProps.updateMouseInteraction}
                startTouchInteraction={ivProps.startTouchInteraction}
                updateTouchInteraction={ivProps.updateTouchInteraction}
                endInteraction={ivProps.endInteraction}
                isActive={ivProps.isActive}
            >
               {(dpProps) => (
                    <a 
                        href={linkDestination} 
                        className={`carousel-card ${dpProps.isActive ? 'active' : ''}`}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            dpProps.handleMouseDown(e);
                        }}
                        onMouseMove={(e) => {
                            e.preventDefault();
                            dpProps.handleMouseMove(e);
                        }}
                        onMouseUp={dpProps.handleInteractionEnd}
                        onMouseLeave={dpProps.handleMouseLeave}
                        onTouchStart={dpProps.handleTouchStart}
                        onTouchMove={dpProps.handleTouchMove}
                        onTouchEnd={dpProps.handleInteractionEnd}
                        onClick={e => e.preventDefault()}
                    >
                        <CardImage 
                            imageURL={imageURL}
                            isArtist={collectionType === collectionTypes.artists}
                            containerRef={dpProps.imageRef}
                        />
                        <p className="carousel-card__label">{label}</p>
                        {additionalLabel && <p className="carousel-card__additional-label">{additionalLabel}</p>}
                        {dpProps.isFetching && <CardLoader />}
                    </a>
               )}
           </DataPreFetcher> 
        )}
    </InteractionValidator>
);

CarouselCard.propTypes = {
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