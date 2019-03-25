import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { faStepForward } from '@fortawesome/free-solid-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import TrackProgressBar from './TrackProgressBar';
import { getPlayerInfo } from '../../selectors';
import { setShuffle, setRepeat, resumePlayer, pausePlayer, skipForwards, skipBackwards } from '../../actions';

const repeatModeMap = {
    'off': 'context',
    'context': 'track',
    'track': 'off'
};

const PlayerControls = (props) => (
    <div className="player-controls">
        <FontAwesomeIcon 
            icon={faRandom} 
            onClick={() => props.setShuffle(!props.isShuffled)}
            className={props.isShuffled ? 'active' : ''} 
        />
        <FontAwesomeIcon icon={faStepBackward} onClick={props.skipBackwards} />
        <FontAwesomeIcon 
            icon={props.isPlaying ? faPauseCircle : faPlayCircle} 
            onClick={props.isPlaying ? props.pausePlayer: props.resumePlayer}
        />
        <FontAwesomeIcon icon={faStepForward} onClick={props.skipForwards} />
        <span className="player-controls__repeat">
            <FontAwesomeIcon 
                icon={faSyncAlt}
                onClick={() => props.setRepeat(repeatModeMap[props.repeat])} 
                className={props.repeat === 'off' ? '' : 'active'}
            />
            <span style={{ display: props.repeat === 'track' ? 'initial' : 'none' }}>1</span>
        </span>
        <TrackProgressBar 
            getTrackProgress={props.getTrackProgress}
            setTrackProgress={props.setTrackProgress}
        /> 
    </div>
);

const mapStateToProps = (state) => {
    const player = getPlayerInfo(state);
    return {
        isPlaying: player.isPlaying,
        isShuffled: player.isShuffled,
        repeat: player.repeat
    };
};

export default connect(
    mapStateToProps,
    { setShuffle, setRepeat, resumePlayer, pausePlayer, skipForwards, skipBackwards }
)(PlayerControls);
