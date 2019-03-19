import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import Album from './Album';
import withAuthAndUserInfo from '../withAuthAndUserInfo';

export class AlbumContainer extends Component {

    static propTypes = {
        albumId: PropTypes.string.isRequired
    }

    componentDidMount() {
        this.props.fetchAlbum(this.props.albumId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.albumId !== this.props.albumId) {
            this.props.fetchAlbum(this.props.albumId);
        }
    }

    render() {
        const { albumId, timestamp } = this.props;
        if (!timestamp) {
            return null;
        }
        return (
            <Album albumId={albumId} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    timestamp: state.albums.timestamps[ownProps.albumId]
});

export const ConnectedAlbumContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchAlbum: ActionCreators.fetchAlbum
    }
)(AlbumContainer));
