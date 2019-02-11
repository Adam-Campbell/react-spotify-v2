import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Followers from '../Followers';
import * as ActionCreators from '../../actions';
import { constructTimeline } from '../../utils';

class PlaylistHeader extends Component {

    static propTypes = {
        playlistId: PropTypes.string.isRequired
    }

    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    containerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        const { top, left } = this.imageRef.current.getBoundingClientRect();
        constructTimeline(this.timeline, {
            hasTransition,
            image: this.imageRef.current,
            title: this.titleRef.current,
            underline: this.underlineRef.current,
            container: this.containerRef.current,
            prevImageWidth: imageWidth,
            prevImageHeight: imageHeight,
            prevImageTop: imageY,
            prevImageLeft: imageX,
            imageTop: top,
            imageLeft: left
        });
        this.props.purgeTransitionImageRect();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.playlist !== this.props.playlistId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left } = this.imageRef.current.getBoundingClientRect();
            constructTimeline(this.timeline, {
                hasTransition,
                image: this.imageRef.current,
                title: this.titleRef.current,
                underline: this.underlineRef.current,
                container: this.containerRef.current,
                prevImageWidth: imageWidth,
                prevImageHeight: imageHeight,
                prevImageTop: imageY,
                prevImageLeft: imageX,
                imageTop: top,
                imageLeft: left
            });
            this.props.purgeTransitionImageRect();
        }
    }

    render() {
        const { imageURL, playlistName, ownerName, playlistFollowerCount } = this.props;
        return (
            <header className="playlist-header">
                <img className="playlist-header__image" alt="" src={imageURL} ref={this.imageRef} />
                <div className="playlist-header__text-container">
                    <h1 className="heading" ref={this.titleRef}>{playlistName}</h1>
                    <span className="playlist-header__underline" ref={this.underlineRef}></span>
                    <div ref={this.containerRef}>
                        <p className="playlist__owner">A playlist by {ownerName}</p>
                        <Followers followerCount={playlistFollowerCount} />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const playlist = state.playlists.playlistData[ownProps.playlistId];
    return {
        imageURL: playlist.images[0].url,
        playlistName: playlist.name,
        ownerName: playlist.owner.display_name,
        playlistFollowerCount: playlist.followers.total,
        imageWidth: state.transitions.imageWidth,
        imageHeight: state.transitions.imageHeight,
        imageX: state.transitions.imageX,
        imageY: state.transitions.imageY,
        hasTransition: state.transitions.hasTransition
    }
};

export default connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect
    }
)(PlaylistHeader);

