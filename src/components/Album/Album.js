import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import AlbumHeader from '../AlbumHeader';
import TrackCollection from '../TrackCollection';

class Album extends Component {
    componentDidMount() {
        this.props.fetchAlbum(this.props.albumId);
    }

    render() {
        if (!this.props.album || !this.props.album.fullAlbumFetched) {
            return null;
        }
        const { tracks, id, uri } = this.props.album;
        return (
            <main className="album">
                <AlbumHeader albumId={this.props.albumId} />
                <section className="album__tracks-container">
                    <TrackCollection 
                        trackIds={tracks}
                        useAlbumLayout={true}
                        contextId={id}
                        contextURI={uri}
                    />
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    album: state.albums.albumData[ownProps.albumId]
});

export const ConnectedAlbum = connect(
    mapStateToProps,
    {
        fetchAlbum: ActionCreators.fetchAlbum
    }
)(Album);
