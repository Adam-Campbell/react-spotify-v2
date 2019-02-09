import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import PlaylistHeader from '../PlaylistHeader';
import TrackCollection from '../TrackCollection';

class PlaylistContainer extends Component {
    componentDidMount() {
        this.props.fetchPlaylist(this.props.playlistId);
    }

    render() {
        if (!this.props.playlist || !this.props.playlist.fullPlaylistFetched) {
            return null;
        }
        const { tracks } = this.props.playlist;
        return (
            <main className="playlist">
                <PlaylistHeader playlistId={this.props.playlistId} />
                <section className="playlist__tracks-container">
                    <TrackCollection trackIds={tracks} />
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    playlist: state.playlists.playlistData[ownProps.playlistId] 
});

export default connect(
    mapStateToProps,
    {
        fetchPlaylist: ActionCreators.fetchPlaylist
    }
)(PlaylistContainer);
