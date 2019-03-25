import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { modalTypes } from '../../constants';
import { getTrack, getAlbum, getPlayerInfo } from '../../selectors';
import { 
    openModal, 
    removeTrackFromPlaylist, 
    selectTrack, 
    pausePlayer, 
    resumePlayer 
} from '../../actions';

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
    const track = getTrack(state, ownProps.trackId);
    const album = getAlbum(state, track.album);
    const player = getPlayerInfo(state);
    const isCurrentlySelected = player.trackId === ownProps.trackId && 
                               player.contextURI === ownProps.contextURI;
    return {
        name: track.name,
        imageURL: album.images.length ? album.images[album.images.length-1].url : '',
        duration: track.duration_minSec,
        trackNumber: track.track_number,
        trackURI: track.uri,
        isCurrentlySelected,
        isPlaying: player.isPlaying
    };
};

export const ConnectedTrack = connect(
    mapStateToProps,
    { openModal, removeTrackFromPlaylist, selectTrack, pausePlayer, resumePlayer }
)(Track);
