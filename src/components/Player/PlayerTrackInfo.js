import React from 'react';
import { connect } from 'react-redux';
import { getTrack, getAlbum, getArtist } from '../../selectors';

const PlayerTrackInfo = props => (
    <div className="track-info">
        <img className="track-info__image" src={props.imageURL} alt="" />
        <div className="track-info__text-container">
            <p className="track-info__track-name">{props.trackName}</p>
            <p className="track-info__artist-name">{props.artistName}</p>
        </div>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    if (!state.player.trackId) {
        return {
            imageUrl: '',
            trackName: '',
            artistName: ''
        }
    }
    // this could be memoized
    const track = getTrack(state, state.player.trackId);
    const album = getAlbum(state, track.album);
    const artist = getArtist(state, track.artists[0]);
    return {
        imageURL: album.images.length ? album.images[0].url : '',
        trackName: track.name,
        artistName: artist.name,
    };
}

export default connect(mapStateToProps)(PlayerTrackInfo);
