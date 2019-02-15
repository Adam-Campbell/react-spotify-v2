import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';
import { faStepForward } from '@fortawesome/free-solid-svg-icons';
import { faRandom } from '@fortawesome/free-solid-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';


class PlayerControls extends Component {
    render() {
        return (
            <div className="player-controls">
                <FontAwesomeIcon icon={faRandom} />
                <FontAwesomeIcon icon={faStepBackward} />
                <FontAwesomeIcon icon={faPlayCircle} />
                <FontAwesomeIcon icon={faStepForward} />
                <FontAwesomeIcon icon={faSyncAlt} />
                <span className="player-controls__prog-bar-outer">
                    <div className="player-controls__prog-bar-inner"></div>
                    <span className="player-controls__prog-bar-knob">
                        <span className="player-controls__prog-bar-knob-inner"></span>
                    </span>
                </span>
            </div>
        )
    }
}

export default PlayerControls;