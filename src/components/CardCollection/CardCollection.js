import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CarouselCard, CreatePlaylistCard } from '../Cards';
import { collectionTypes } from '../../constants';

export const getImageURL = (item, collectionType) => {
    if (collectionType === collectionTypes.categories) {
        return item.icons.length ? item.icons[0].url : '';
    } else {
        return item.images.length ? item.images[0].url : '';
    }
}

const CardCollection = (props) => (
    props.isWithinCarousel ? (
        <React.Fragment>
            {props.includeCreatePlaylistCard && <CreatePlaylistCard />}
            {props.items.map((item, index) => (
                <CarouselCard 
                    key={`${item.id}--${index}`}
                    linkDestination={props.URLPath + item.id}
                    imageURL={getImageURL(item, props.collectionType)}
                    label={item.name}
                    itemId={item.id}
                    collectionType={props.collectionType}
                    additionalLabel={item.additional}
                />
            ))}
        </React.Fragment>
    ) : (
        <div className="card-collection">
            {props.includeCreatePlaylistCard && <CreatePlaylistCard />}
            {props.items.map((item, index) => (
                <div key={`${item.id}--${index}`}className="card-collection__card-holder">
                    <Card 
                        linkDestination={props.URLPath + item.id}
                        imageURL={getImageURL(item, props.collectionType)}
                        label={item.name}
                        itemId={item.id}
                        collectionType={props.collectionType}
                        additionalLabel={props.additional}
                    />
                </div>
            ))}
        </div>
    )
);

CardCollection.propTypes = {
    itemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    includeCreatePlaylistCard: PropTypes.bool,
    collectionType: PropTypes.oneOf([
        collectionTypes.artists, 
        collectionTypes.albums, 
        collectionTypes.playlists,
        collectionTypes.categories
    ]).isRequired,
    isWithinCarousel: PropTypes.bool,
    includeAdditionalLabel: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    switch (ownProps.collectionType) {
        case collectionTypes.artists:
            return {
                items: ownProps.itemIds.map(itemId => state.artists.artistData[itemId]),
                URLPath: '/artist/'
            };

        // case collectionTypes.albums_:
        //     return {
        //         items: ownProps.itemIds.map(itemId => state.albums.albumData[itemId]),
        //         URLPath: '/album/'
        //     };

        case collectionTypes.albums:
            return {
                items: ownProps.itemIds.map(itemId => {
                    const albumObject = state.albums.albumData[itemId];
                    if (ownProps.includeAdditionalLabel) {
                        const albumArtistId = albumObject.artists[0];
                        return {
                            ...albumObject,
                            additional: state.artists.artistData[albumArtistId].name
                        }
                    } else {
                        return albumObject;
                    }
                }),
                URLPath: '/album/'
            };
        

        case collectionTypes.playlists:
            return {
                items: ownProps.itemIds.map(itemId => state.playlists.playlistData[itemId]),
                URLPath: '/playlist/'
            };

        case collectionTypes.categories:
            return {
                items: ownProps.itemIds.map(itemId => state.categories.categoryData[itemId]),
                URLPath: '/category/'
            };

        default:
            return {
                items: [],
                URLPath: ''
            };
    }
};

export const ConnectedCardCollection = connect(mapStateToProps)(CardCollection);