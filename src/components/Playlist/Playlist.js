import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import PlaylistHeader from '../PlaylistHeader';
import OwnedPlaylistHeader from '../OwnedPlaylistHeader';
import TrackCollection from '../TrackCollection';
import { constructTimeline } from '../../utils';

class Playlist extends Component {

    static propTypes = {
        playlistId: PropTypes.string.isRequired
    };

    pageContainerRef = React.createRef();
    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    followersContainerRef = React.createRef();
    mainContentContainerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        const { top, left } = this.imageRef.current.getBoundingClientRect();
        constructTimeline(this.timeline, {
            hasTransition,
            image: this.imageRef.current,
            title: this.titleRef.current,
            underline: this.underlineRef.current,
            headerAdditional: this.followersContainerRef.current,
            mainContent: this.mainContentContainerRef.current,
            fullPage: this.pageContainerRef.current,
            prevImageWidth: imageWidth,
            prevImageHeight: imageHeight,
            prevImageTop: imageY,
            prevImageLeft: imageX,
            imageTop: top,
            imageLeft: left
        });
        this.props.purgeTransitionImageRect();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playlistId !== this.props.playlistId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left } = this.imageRef.current.getBoundingClientRect();
            constructTimeline(this.timeline, {
                hasTransition,
                image: this.imageRef.current,
                title: this.titleRef.current,
                underline: this.underlineRef.current,
                headerAdditional: this.followersContainerRef.current,
                mainContent: this.mainContentContainerRef.current,
                fullPage: this.pageContainerRef.current,
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
        const isOwner = this.props.playlist.owner.id === this.props.currentUserId;
        const { tracks, uri } = this.props.playlist;
        return (
            <main 
                className="playlist"
                ref={this.pageContainerRef}
            >
                {isOwner ? (
                    <OwnedPlaylistHeader 
                        playlistId={this.props.playlistId}
                        imageRef={this.imageRef}
                        titleRef={this.titleRef}
                        underlineRef={this.underlineRef}
                        followersContainerRef={this.followersContainerRef} 
                    />
                ) : (
                    <PlaylistHeader 
                        playlistId={this.props.playlistId} 
                        imageRef={this.imageRef}
                        titleRef={this.titleRef}
                        underlineRef={this.underlineRef}
                        followersContainerRef={this.followersContainerRef} 
                    />
                )}
                <section 
                    className="playlist__tracks-container"
                    ref={this.mainContentContainerRef}
                >
                    <TrackCollection 
                        trackIds={tracks} 
                        contextId={this.props.playlistId}
                        contextURI={uri}
                        includeRemoveTrackButton={isOwner} 
                    />
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    playlist: state.playlists.playlistData[ownProps.playlistId],
    currentUserId: state.user.id,
    imageWidth: state.transitions.imageWidth,
    imageHeight: state.transitions.imageHeight,
    imageX: state.transitions.imageX, 
    imageY: state.transitions.imageY,
    hasTransition: state.transitions.hasTransition
});

export default connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect
    }
)(Playlist)
