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
    <li className={`track ${props.isCurrentlySelected ? 'currently-playing' : ''}`}
        onClick={() => {
                if (props.isCurrentlySelected) {
                    if (props.isPlaying) {
                        props.pausePlayer();
                    } else {
                        props.resumePlayer();
                    }
                } else {
                    props.selectTrack({
                        contextURI: props.contextURI,
                        contextId: props.contextId, 
                        trackURI: props.trackURI,
                        trackId: props.trackId
                    });
                }
        }}
    >
        {props.useAlbumLayout || <img className="track__image" alt="" src={props.imageURL} />}
        {(props.isCurrentlySelected && props.isPlaying) ? <FontAwesomeIcon icon={faPauseCircle} /> :
            <FontAwesomeIcon icon={faPlayCircle} />
        }
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
    contextId: PropTypes.string,
    contextURI: PropTypes.string
};

const mapStateToProps = (state, ownProps) => {
    const track = state.tracks[ownProps.trackId];
    const album = state.albums.albumData[track.album];
    // const currentTrack = state.player.trackId;
    // const currentContext = state.player.contextURI;
    const isCurrentlySelected = state.player.trackId === ownProps.trackId && 
                               state.player.contextURI === ownProps.contextURI;
    return {
        name: track.name,
        imageURL: album.images.length ? album.images[0].url : '',
        duration: convertMsToMinSec(track.duration_ms),
        trackNumber: track.track_number,
        trackURI: track.uri,
        isCurrentlySelected,
        isPlaying: state.player.isPlaying
    };
};

export const ConnectedTrack = connect(
    mapStateToProps,
    { 
        openModal: ActionCreators.openModal,
        removeTrackFromPlaylist: ActionCreators.removeTrackFromPlaylist,
        selectTrack: ActionCreators.selectTrack,
        pausePlayer: ActionCreators.pausePlayer,
        resumePlayer: ActionCreators.resumePlayer
    }
)(Track);
