import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { withRouter } from 'react-router-dom';
import { collectionTypes } from '../../constants';
import SmartImage from '../SmartImage';

class CarouselCard extends Component {
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

    state = {
        isActive: false,
        startX: null,
        startY: null
    };

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
    fetchAndRedirect = async () => {
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

    startInteraction = (clientX, clientY) => {
        this.setState({
            isActive: true,
            startX: clientX,
            startY: clientY
        });
    }

    endInteraction = () => {
        this.setState({
            isActive: false,
            startX: null,
            startY: null
        });
    }

    handleMouseDown = (e) => {
        const { clientX, clientY } = e;
        this.startInteraction(clientX, clientY);
    }

    handleMouseMove = (e) => {
        if (this.state.isActive) {
            const { clientX, clientY } = e;
            const { startX, startY } = this.state;
            const absX = Math.abs(clientX - startX);
            const absY = Math.abs(clientY - startY);
            if (absX > 3 || absY > 3) {
                this.endInteraction();
            }
        }
    }

    handleTouchStart = (e) => {
        const { clientX, clientY } = e.targetTouches[0];
        this.startInteraction(clientX, clientY);
    }

    handleTouchMove = (e) => {
        if (this.state.isActive) {
            const { clientX, clientY } = e.targetTouches[0];
            const { startX, startY } = this.state;
            const absX = Math.abs(clientX - startX);
            const absY = Math.abs(clientY - startY);
            if (absX > 3 || absY > 3) {
                this.endInteraction();
            }
        }
    }

    handleMouseUp = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.isActive) {
            this.fetchAndRedirect();
        }
        this.endInteraction();
    }

    handleTouchEnd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (this.state.isActive) {
            this.fetchAndRedirect();
        }
        this.endInteraction();
    }

    render() {
        const { isActive } = this.state;
        return (
            <a 
                href={this.props.linkDestination} 
                className={`carousel-card ${isActive ? 'active' : ''}`}
                onMouseDown={this.handleMouseDown}
                onMouseMove={this.handleMouseMove}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.endInteraction}
                onTouchStart={this.handleTouchStart}
                onTouchMove={this.handleTouchMove}
                onTouchEnd={this.handleTouchEnd}
            >
                <SmartImage 
                    imageURL={this.props.imageURL}
                    isArtist={this.props.collectionType === collectionTypes.artists}
                    isFixedSize={false}
                    containerRef={this.imageRef}
                />
                <p className="carousel-card__label">{this.props.label}</p>
            </a>
        );
    }
}

export const ConnectedCarouselCard = withRouter(
    connect(
        undefined, 
        {
            storeTransitionImageRect: ActionCreators.storeTransitionImageRect,
            fetchArtist: ActionCreators.fetchArtist,
            fetchAlbum: ActionCreators.fetchAlbum,
            fetchPlaylist: ActionCreators.fetchPlaylist,
            fetchCategoriesPlaylists: ActionCreators.fetchCategoriesPlaylists
        }
    )(CarouselCard)
);