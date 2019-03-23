import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, CarouselCard, CreatePlaylistCard } from '../Cards';
import { collectionTypes } from '../../constants';
import { 
    makeGetCollectionOfArtists, 
    makeGetCollectionOfAlbums, 
    makeGetCollectionOfPlaylists, 
    makeGetCollectionOfCategories
} from '../../selectors';

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
                        additionalLabel={item.additional}
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

const makeMapStateToProps = () => {
    const getCollectionOfArtists = makeGetCollectionOfArtists();
    const getCollectionOfAlbums = makeGetCollectionOfAlbums();
    const getCollectionOfPlaylists = makeGetCollectionOfPlaylists();
    const getCollectionOfCategories = makeGetCollectionOfCategories();
    const mapStateToProps = (state, ownProps) => {
        switch (ownProps.collectionType) {
            case collectionTypes.artists:
                return {
                    items: getCollectionOfArtists(state, ownProps.itemIds),
                    URLPath: '/artist/',
                    allItems: state.artists.entities
                };

            case collectionTypes.albums:
                return {
                    items: getCollectionOfAlbums(state, ownProps.itemIds, ownProps.includeAdditionalLabel),
                    URLPath: '/album/',
                    allItems: state.albums.entities
                };
            
            case collectionTypes.playlists:
                return {
                    items: getCollectionOfPlaylists(state, ownProps.itemIds),
                    URLPath: '/playlist/',
                    allItems: state.playlists.entities,
                };

            case collectionTypes.categories:
                return {
                    items: getCollectionOfCategories(state, ownProps.itemIds),
                    URLPath: '/category/',
                    allItems: state.categories.entities
                };

            default:
                return {
                    items: [],
                    URLPath: ''
                };
        }
    }
    return mapStateToProps;
};

export const ConnectedCardCollection = connect(makeMapStateToProps)(CardCollection);
