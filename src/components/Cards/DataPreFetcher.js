import React, { Component, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { collectionTypes } from '../../constants';
import { 
    storeTransitionImageRect,
    fetchArtist,
    fetchAlbum,
    fetchPlaylist,
    fetchCategory
} from '../../actions';

/**
 * Handles the prefetching of both the data and the JS bundle associated with a particular collectionType,
 * as well as managing loading status via component state. Passed both the prefetching function and the
 * current loading state to the component that it renders via a render prop.
 */
export class DataPreFetcher extends Component {

    static propTypes = {
        itemId: PropTypes.string.isRequired, 
        collectionType: PropTypes.oneOf([
            collectionTypes.artists, 
            collectionTypes.albums, 
            collectionTypes.playlists,
            collectionTypes.categories
        ]).isRequired,
        linkDestination: PropTypes.string.isRequired,
        // All of the below props are optional, and will be present only when component is enhanced with
        // InteractionValidator.
        shouldManageValidation: PropTypes.bool,
        startMouseInteraction: PropTypes.func,
        updateMouseInteraction: PropTypes.func,
        startTouchInteraction: PropTypes.func,
        updateTouchInteraction: PropTypes.func,
        endInteraction: PropTypes.func,
        isActive: PropTypes.bool
    }

    state = {
        isFetching: false
    }

    imageRef = React.createRef();

    /**
     * Takes a given collection type and returns the corresponding data fetching function. 
     * @param {String} collectionType - the collection type that the card belongs to.
     * @returns {Function} - the data fetching function corresponding to the collection type.
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
                return this.props.fetchCategory;

            default:
                return this.props.fetchArtist;
        }
    }

    /**
     * Takes a given collection type and returns a dynamic import for the bundle containing the resources
     * needed to display the page corresponding to that collection type. This is important as the app uses
     * code splitting at the route level to make the initial bundle smaller, and resource associated with a 
     * route are lazily loaded when that route is hit. When navigating via card however, in order for the
     * transitions to work there cannot be a loading screen in between routes, therefore the card must
     * dynamically import the necessary resources before redirecting to the new route.
     * @param {String} collectionType - the collection type that the card belongs to.
     * @returns {Function} - a promise that resolves when the resources are loaded.
     */
    getBundle = (collectionType) => {
        switch (collectionType) {
            case collectionTypes.artists:
                return import('../ArtistProfile');

            case collectionTypes.albums:
                return import('../Album');

            case collectionTypes.playlists:
                return import('../Playlist');

            case collectionTypes.categories:
                return import('../Category');

            default:
                return import('../ArtistProfile');
        }
    }

    /**
     * This function passes the dimension and location of the clicked image to the store to allow a smooth
     * transition, then ensures that the data and resources for the route to be transitioned to have been 
     * fetched, then finally redirects to the specified route. 
     */
    fetchAndRedirect = async () => {
        this.setState({
            isFetching: true
        });
        const { width, height, top, left, y } = this.imageRef.current.getBoundingClientRect();
        // Provides an alternative way of calculating top offset that helps mitigate some inconsistencies
        // in certain older browsers
        //const adjustedTop = y ? y : top - window.pageYOffset;
        this.props.storeTransitionImageRect(width, height, left, top);
        const fetchingFunction = this.getFetchingFunction(this.props.collectionType);
        await Promise.all([
            fetchingFunction(this.props.itemId, true),
            this.getBundle(this.props.collectionType)
        ]);
        this.setState({
            isFetching: false
        });
        window.scrollTo(0, 0);
        this.props.history.push({
            pathname: this.props.linkDestination
        });
    }

    /**
     * Handles the end of an interaction (triggered by mouseup, mouseleave or touchend events). Determines 
     * whether or not it should call the fetchAndRedirect method based on the boolean values isActive and
     * shouldManageValidation.
     */
    handleInteractionEnd = () => {
        const { shouldManageValidation, isActive, endInteraction } = this.props;
        // If this component should not care about interaction validation, always call fetchAndRedirect
        if (!shouldManageValidation) {
            this.fetchAndRedirect();
            // If this component should care about interaction validation, call fetchAndRedirect only if
            // isActive is true, but always call endInteraction.
        } else {
            if (isActive) {
                this.fetchAndRedirect();
            }
            endInteraction();
        }
    }

    render() {
        const { 
            shouldManageValidation, 
            startMouseInteraction,
            updateMouseInteraction,
            startTouchInteraction,
            updateTouchInteraction,
            endInteraction,
            isActive,
            children 
        } = this.props;
        if (shouldManageValidation) {
            return children({
                handleMouseDown: startMouseInteraction,
                handleMouseMove: updateMouseInteraction,
                handleTouchStart: startTouchInteraction,
                handleTouchMove: updateTouchInteraction,
                handleMouseLeave: endInteraction,
                handleInteractionEnd: this.handleInteractionEnd,
                imageRef: this.imageRef,
                isActive: isActive,
                isFetching: this.state.isFetching
            });
        } else {
            return children({
                handleInteractionEnd: this.handleInteractionEnd,
                imageRef: this.imageRef,
                isFetching: this.state.isFetching
            });
        }
    }
}

export default withRouter(
    connect(
        undefined, 
        { storeTransitionImageRect, fetchArtist, fetchAlbum, fetchPlaylist, fetchCategory }
    )(DataPreFetcher)
);
