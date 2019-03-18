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
        // if (!this.props.album || !this.props.album.fullAlbumFetched) {
        //     return null;
        // }
        if (!this.props.albumFetchedAt) {
            return null;
        }
        return (
            <Album albumId={this.props.albumId} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    //album: state.albums.albumData[ownProps.albumId],
    albumFetchedAt: state.albumFetchedAt[ownProps.albumId]
});

export const ConnectedAlbumContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchAlbum: ActionCreators.fetchAlbum
    }
)(AlbumContainer));
