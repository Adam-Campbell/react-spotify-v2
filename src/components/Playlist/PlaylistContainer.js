import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import Playlist from './Playlist';
import withAuthAndUserInfo from '../withAuthAndUserInfo'

class PlaylistContainer extends Component {

    static propTypes = {
        playlistId: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.props.fetchPlaylist(this.props.playlistId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playlistId !== this.props.playlistId) {
            this.props.fetchPlaylist(this.props.playlistId);
        }
    }

    render() {
        const { playlistId, playlistFetchedAt } = this.props;
        if (!playlistFetchedAt) {
            return null;
        }
        return (
            <Playlist playlistId={playlistId} />
        );
        
    }
}

const mapStateToProps = (state, ownProps) => ({
    //playlist: state.playlists.playlistData[ownProps.playlistId] 
    playlistFetchedAt: state.playlistFetchedAt[ownProps.playlistId]
});

export const ConnectedPlaylistContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchPlaylist: ActionCreators.fetchPlaylist
    }
)(PlaylistContainer));
