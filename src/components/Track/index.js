import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const convertMsToMinSec = ms => {
    const toSecs = ms / 1000;
    const totalMins = Math.floor(toSecs / 60);
    let remainingSecs = Math.round(toSecs % 60);
    if (remainingSecs < 10) remainingSecs = '0' + remainingSecs;
    return `${totalMins}:${remainingSecs}`;
};


const Track = props => (
    <li className="track">
        {props.useAlbumLayout || <img className="track__image" alt="" src={props.imageURL} />}
        <FontAwesomeIcon icon={faPlayCircle} />
        {props.useAlbumLayout && <span className="track__number">{props.trackNumber}</span>}
        <p className="track__name">{props.name}</p>
        <FontAwesomeIcon icon={faPlus} />
        <span className="track__duration">{props.duration}</span>
    </li>
);

Track.propTypes = {
    trackId: PropTypes.string.isRequired,
    useAlbumLayout: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    const track = state.tracks[ownProps.trackId];
    const album = state.albums.albumData[track.album];
    return {
        name: track.name,
        imageURL: album.images[0].url,
        duration: convertMsToMinSec(track.duration_ms),
        trackNumber: track.track_number
    };
};

export default connect(mapStateToProps)(Track);

