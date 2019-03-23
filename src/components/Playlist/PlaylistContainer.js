import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchPlaylist } from '../../actions';
import Playlist from './Playlist';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import Loader from '../Loader';
import { getPlaylistTimestamp, getLoadingStatus } from '../../selectors';

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
    timestamp: getPlaylistTimestamp(state, ownProps.playlistId),
    isLoading: getLoadingStatus(state, 'playlistView')
});

export const ConnectedPlaylistContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    { fetchPlaylist }
)(PlaylistContainer));
