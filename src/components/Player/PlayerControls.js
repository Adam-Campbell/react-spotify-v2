import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { faStepForward } from '@fortawesome/free-solid-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { IsomorphicPlayerConsumer } from '../IsomorphicPlayerProvider';

class PlayerControls extends Component {

    static repeatModeMap = {
        'off': 'context',
        'context': 'track',
        'track': 'off'
    };

    render() {
        return (
            <IsomorphicPlayerConsumer>
                {({ resume, pause, nextTrack, previousTrack }) => (
                    <div className="player-controls">
                        <FontAwesomeIcon 
                            icon={faRandom} 
                            onClick={() => this.props.setShuffle(!this.props.isShuffled)}
                            className={this.props.isShuffled ? 'active' : ''} 
                        />
                        <FontAwesomeIcon icon={faStepBackward} onClick={previousTrack} />
                        <FontAwesomeIcon 
                            icon={this.props.isPlaying ? faPauseCircle : faPlayCircle} 
                            onClick={this.props.isPlaying ? pause: resume}
                        />
                        <FontAwesomeIcon icon={faStepForward} onClick={nextTrack} />
                        <span className="player-controls__repeat">
                            <FontAwesomeIcon 
                                icon={faSyncAlt}
                                onClick={() => this.props.setRepeat(PlayerControls.repeatModeMap[this.props.repeat])} 
                                className={this.props.repeat === 'off' ? '' : 'active'}
                            />
                            <span style={{ display: this.props.repeat === 'track' ? 'initial' : 'none' }}>1</span>
                        </span>
                        <span className="player-controls__prog-bar-outer">
                            <div className="player-controls__prog-bar-inner"></div>
                            <span className="player-controls__prog-bar-knob">
                                <span className="player-controls__prog-bar-knob-inner"></span>
                            </span>
                        </span>
                    </div>
                )}
            </IsomorphicPlayerConsumer>
        )
    }
}

const mapStateToProps = (state) => ({
    isPlaying: state.player.isPlaying,
    isShuffled: state.player.isShuffled,
    repeat: state.player.repeat
});

export default connect(
    mapStateToProps,
    {
        setShuffle: ActionCreators.setShuffle,
        setRepeat: ActionCreators.setRepeat
    }
)(PlayerControls);