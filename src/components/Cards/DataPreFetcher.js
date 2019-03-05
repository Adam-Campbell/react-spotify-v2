import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { withRouter } from 'react-router-dom';
import { collectionTypes } from '../../constants';

class DataPreFetcher extends Component {

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

    imageRef = React.createRef();

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
                return this.props.fetchCategory;

            default:
                return this.props.fetchArtist;
        }
    }

    /**
     * This function passes the dimension and location the clicked image to the store to allow a smooth
     * transition, then ensures that the data for the route to be transitioned to has been fetched, then
     * finally redirects to the specified route. 
     */
    fetchAndRedirect = async () => {
        //e.preventDefault();
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
                isActive: isActive
            });
        } else {
            return children({
                handleInteractionEnd: this.handleInteractionEnd,
                imageRef: this.imageRef
            });
        }
    }
}

export default withRouter(
    connect(
        undefined, 
        {
            storeTransitionImageRect: ActionCreators.storeTransitionImageRect,
            fetchArtist: ActionCreators.fetchArtist,
            fetchAlbum: ActionCreators.fetchAlbum,
            fetchPlaylist: ActionCreators.fetchPlaylist,
            fetchCategory: ActionCreators.fetchCategory
        }
    )(DataPreFetcher)
);