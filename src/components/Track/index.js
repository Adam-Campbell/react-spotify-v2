import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalTypes } from '../../constants';

export const convertMsToMinSec = ms => {
    const toSecs = ms / 1000;
    const totalMins = Math.floor(toSecs / 60);
    let remainingSecs = Math.round(toSecs % 60);
    if (remainingSecs < 10) remainingSecs = '0' + remainingSecs;
    return `${totalMins}:${remainingSecs}`;
};


export const Track = props => (
    <li className="track">
        {props.useAlbumLayout || <img className="track__image" alt="" src={props.imageURL} />}
        <FontAwesomeIcon icon={faPlayCircle} />
        {props.useAlbumLayout && <span className="track__number">{props.trackNumber}</span>}
        <p className="track__name">{props.name}</p>
        <FontAwesomeIcon 
            icon={faPlus} 
            onClick={(e) => {
                e.stopPropagation();
                props.openModal(
                    modalTypes.addToPlaylist, 
                    { 
                        trackURI: props.trackURI, 
                        trackId: props.trackId 
                    }
                );
            }}
        />
        {props.includeRemoveTrackButton && (
            <FontAwesomeIcon 
                icon={faTimes} 
                onClick={(e) => {
                    e.stopPropagation();
                    props.removeTrackFromPlaylist(
                        props.trackURI,
                        props.trackId,
                        props.contextId
                    );
                }}
            />
        )}
        <span className="track__duration">{props.duration}</span>
    </li>
);

Track.propTypes = {
    trackId: PropTypes.string.isRequired,
    useAlbumLayout: PropTypes.bool,
    includeRemoveTrackButton: PropTypes.bool,
    contextId: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    const track = state.tracks[ownProps.trackId];
    const album = state.albums.albumData[track.album];
    return {
        name: track.name,
        imageURL: album.images.length ? album.images[0].url : '',
        duration: convertMsToMinSec(track.duration_ms),
        trackNumber: track.track_number,
        trackURI: track.uri
    };
};

export default connect(
    mapStateToProps,
    { 
        openModal: ActionCreators.openModal,
        removeTrackFromPlaylist: ActionCreators.removeTrackFromPlaylist
    }
)(Track);

