import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PlayerTrackInfo = props => (
    <div className="track-info">
        <img className="track-info__image" src="https://i.scdn.co/image/74254e608e94da97fbcffaabae220ca4f4dc25f1" alt="" />
        <div className="track-info__text-container">
            <p className="track-info__track-name">Track name here</p>
            <p className="track-info__artist-name">Artist name here</p>
        </div>
    </div>
);

// PlayerTrackInfo.propTypes = {
//     trackId: PropTypes.string.isRequired
// };

const mapStateToProps = (state, ownProps) => {
    const track = state.tracks[ownProps.trackId];
    const album = state.albums.albumData[track.album];
    const artist = state.artists.artistData[track.artists[0]];
    return {
        imageURL: album.images.length ? album.images[0].url : '',
        trackName: track.name,
        artistName: artist.name,
    };
}

export default PlayerTrackInfo;
//export default connect(mapStateToProps)(PlayerTrackInfo);