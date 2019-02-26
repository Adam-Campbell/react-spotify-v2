import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { Link, withRouter } from 'react-router-dom';
import { collectionTypes } from '../../constants';
import SmartImage from '../SmartImage';


/*

Data prefetching with cards.

Cards can link to one of the following:

artist
    /artist/artistId
    fetchArtist(artistId)

album
    /album/albumId
    fetchAlbum(albumId)

playlist
    /playlist/playlistId
    fetchPlaylist(playlistId)

category
    /category/categoryId
    fetchCategoriesPlaylists(categoryId) - think this needs to change however

Each of these actions needs to be 'awaitable'. When the card is clicked the appropriate fetching function
will be called, and then the card will await the fetching function. Once the fetching function has completed, 
the card will then redirect to the new route which will load instantly since the data is already there. 


*/



export class Card extends Component {
    imageRef = React.createRef();

    static propTypes = {
        linkDestination: PropTypes.string.isRequired,
        imageURL: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        collectionType: PropTypes.oneOf([
            collectionTypes.artists, 
            collectionTypes.albums, 
            collectionTypes.playlists,
            collectionTypes.categories
        ]),
        itemId: PropTypes.string
    }

    /**
     * This function simply returns the correct data fetching function based on the route that the card
     * should redirect to when clicked. 
     */
    getFetchingFunction = (collectionType) => {
        switch (collectionType) {
            case collectionTypes.artists:
                return this.props.fetchArtist;

            case collectionTypes.albums:
                return this.props.fetchAlbum;

            case collectionTypes.playlists:
                return this.props.fetchPlaylist;

            case collectionTypes.categories:
                return this.props.fetchCategoriesPlaylists;

            default:
                return this.props.fetchArtist;
        }
    }

    /**
     * This function passes the dimension and location the clicked image to the store to allow a smooth
     * transition, then ensures that the data for the route to be transitioned to has been fetched, then
     * finally redirects to the specified route. 
     */
    handleClick = async (e) => {
        e.preventDefault();
        const { width, height, top, left, y } = this.imageRef.current.getBoundingClientRect();
        // Provides an alternative way of calculating top offset that helps mitigate some inconsistencies
        // in certain older browsers
        const adjustedTop = y ? y : top - window.pageYOffset
        this.props.storeTransitionImageRect(width, height, left, adjustedTop);
        const fetchingFunction = this.getFetchingFunction(this.props.collectionType);
        await fetchingFunction(this.props.itemId);
        window.scrollTo(0,0);
        this.props.history.push({
            pathname: this.props.linkDestination
        });
    }

    render() {
        return (
            <a href={this.props.linkDestination} className="card" onClick={this.handleClick}>
                <SmartImage 
                    imageURL={this.props.imageURL}
                    isArtist={this.props.collectionType === collectionTypes.artists}
                    isFixedSize={false}
                    containerRef={this.imageRef}
                />
                <p className="card__label">{this.props.label}</p>
            </a>
        )
    }
}

// <img className="card__image" alt="" src={this.props.imageURL} ref={this.imageRef} />
// <div className="card__image-container"></div>

export default withRouter(
    connect(
        undefined, 
        {
            storeTransitionImageRect: ActionCreators.storeTransitionImageRect,
            fetchArtist: ActionCreators.fetchArtist,
            fetchAlbum: ActionCreators.fetchAlbum,
            fetchPlaylist: ActionCreators.fetchPlaylist,
            fetchCategoriesPlaylists: ActionCreators.fetchCategoriesPlaylists
        }
    )(Card)
);


// const _Card = props => (
//     <Link to={props.linkDestination} className="card">
//         <div className="card__image-container">
//             <img className="card__image" alt="" src={props.imageURL} />
//         </div>
//         <p className="card__label">{props.label}</p>
//     </Link>
// );

// Card.propTypes = {
//     linkDestination: PropTypes.string.isRequired,
//     imageURL: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired
// };

