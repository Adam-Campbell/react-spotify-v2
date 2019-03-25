import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { purgeTransitionImageRect } from '../../actions';
import PlaylistHeader from '../PlaylistHeader';
import OwnedPlaylistHeader from '../OwnedPlaylistHeader';
import TrackCollection from '../TrackCollection';
import { constructTimeline } from '../../utils';
import PaginatedTrackCollection from '../PaginatedTrackCollection';
import PaginationControls from '../PaginationControls';
import { 
    getPlaylistTrackIds, 
    getPlaylist, 
    getUserIsPlaylistOwner,
    getTransitionData
} from '../../selectors';

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
        const { top, left, width, height } = this.imageRef.current.getBoundingClientRect();
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
            currImageWidth: width,
            currImageHeight: height,
            currImageTop: top,
            currImageLeft: left
        });
        this.props.purgeTransitionImageRect();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playlistId !== this.props.playlistId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left, width, height } = this.imageRef.current.getBoundingClientRect();
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
                currImageWidth: width,
                currImageHeight: height,
                currImageTop: top,
                currImageLeft: left
            });
            this.props.purgeTransitionImageRect();
        }
    }

    render() {
        const {
            playlistId,
            playlistURI,
            playlistTrackIds,
            isPlaylistOwner
        } = this.props;
        return (
            <main 
                className="playlist"
                ref={this.pageContainerRef}
            >
                {isPlaylistOwner ? (
                    <OwnedPlaylistHeader 
                        playlistId={playlistId}
                        imageRef={this.imageRef}
                        titleRef={this.titleRef}
                        underlineRef={this.underlineRef}
                        followersContainerRef={this.followersContainerRef} 
                    />
                ) : (
                    <PlaylistHeader 
                        playlistId={playlistId} 
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
                    <PaginatedTrackCollection itemIds={playlistTrackIds}>
                        {({ itemIds, setPage, numberOfPages, currentPage }) => (
                            <React.Fragment>
                                <TrackCollection 
                                    trackIds={itemIds}
                                    contextId={playlistId}
                                    contextURI={playlistURI}
                                    includeRemoveTrackButton={isPlaylistOwner}
                                />
                                <PaginationControls 
                                    numberOfPages={numberOfPages}
                                    currentPage={currentPage}
                                    setPage={setPage}
                                />
                            </React.Fragment>
                        )}
                    </PaginatedTrackCollection>
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const transitionData = getTransitionData(state);
    const playlist = getPlaylist(state, ownProps.playlistId);
    return {
        playlistTrackIds: getPlaylistTrackIds(state, ownProps.playlistId),
        playlistURI: playlist.uri,
        isPlaylistOwner: getUserIsPlaylistOwner(state, playlist.owner.id),
        imageWidth: transitionData.imageWidth,
        imageHeight: transitionData.imageHeight,
        imageX: transitionData.imageX, 
        imageY: transitionData.imageY,
        hasTransition: transitionData.hasTransition
    };
};

export default connect(
    mapStateToProps,
    { purgeTransitionImageRect }
)(Playlist);
