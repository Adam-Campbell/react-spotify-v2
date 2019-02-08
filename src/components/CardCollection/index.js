import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../Card';
import { collectionTypes } from '../../constants';

const CardCollection = props => (
    <div className="card-collection">
        {props.items.map((item, index) => (
            <div key={`${item.id}--${index}`}className="card-collection__card-holder">
                <Card 
                    linkDestination={props.URLPath + item.id}
                    imageURL={item.images[0].url}
                    label={item.name}
                />
            </div>
        ))}
    </div>
);

CardCollection.propTypes = {
    itemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    collectionType: PropTypes.oneOf([
        collectionTypes.artists, 
        collectionTypes.albums, 
        collectionTypes.playlists
    ])
};

const mapStateToProps = (state, ownProps) => {
    switch (ownProps.collectionType) {
        case collectionTypes.artists:
            return {
                items: ownProps.itemIds.map(itemId => state.artists.artistData[itemId]),
                URLPath: '/artist/'
            };

        case collectionTypes.albums:
            return {
                items: ownProps.itemIds.map(itemId => state.albums.albumData[itemId]),
                URLPath: '/album/'
            };

        case collectionTypes.playlists:
            return {
                items: ownProps.itemIds.map(itemId => state.playlists.playlistData[itemId]),
                URLPath: '/playlist/'
            };

        default:
            return {
                items: [],
                URLPath: ''
            };
    }
};

export default connect(mapStateToProps)(CardCollection);