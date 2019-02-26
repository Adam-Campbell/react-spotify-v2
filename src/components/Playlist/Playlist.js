import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import PlaylistHeader from '../PlaylistHeader';
import TrackCollection from '../TrackCollection';
import OwnedPlaylistHeader from '../OwnedPlaylistHeader';

class PlaylistContainer extends Component {
    componentDidMount() {
        this.props.fetchPlaylist(this.props.playlistId);
    }

    render() {

        //return null;

        if (!this.props.playlist || !this.props.playlist.fullPlaylistFetched) {
            return null;
        }
        const isOwner = this.props.playlist.owner.id === this.props.currentUserId;
        const { tracks, uri } = this.props.playlist;
        // As well as conditionally rendering OwnedPlaylistHeader when current user owns the playlist, 
        // the Track components rendered need to have the ability to add a track to a modal when the 
        // current user owns the playlist (but only when that is the case).
        return (
            <main className="playlist">
                {isOwner ? 
                    <OwnedPlaylistHeader playlistId={this.props.playlistId} /> :
                    <PlaylistHeader playlistId={this.props.playlistId} />
                }
                <section className="playlist__tracks-container">
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
    currentUserId: state.user.id 
});

export const ConnectedPlaylist = connect(
    mapStateToProps,
    {
        fetchPlaylist: ActionCreators.fetchPlaylist
    }
)(PlaylistContainer);
