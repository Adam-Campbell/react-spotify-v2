import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import Playlist from './Playlist';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import Loader from '../Loader';

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
        const { playlistId, timestamp, isLoading } = this.props;

        if (isLoading) {
            return <Loader />;
        }

        if (!timestamp) {
            return null;
        }
        return (
            <Playlist playlistId={playlistId} />
        );
        
    }
}

const mapStateToProps = (state, ownProps) => ({
    timestamp: state.playlists.timestamps[ownProps.playlistId],
    isLoading: state.ui.loadingStatus.playlistView
});

export const ConnectedPlaylistContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchPlaylist: ActionCreators.fetchPlaylist
    }
)(PlaylistContainer));
