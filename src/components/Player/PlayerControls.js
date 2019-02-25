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
import TrackProgressBar from './TrackProgressBar';

class PlayerControls extends Component {

    static repeatModeMap = {
        'off': 'context',
        'context': 'track',
        'track': 'off'
    };

    progBarOuterRef = React.createRef();
    progBarInnerRef = React.createRef();
    knobRef = React.createRef();
    progBarInterval = null;

    componentDidMount() {
        //this.progBarInterval = setInterval(this.updateProgBar, 50);
    }

    componentWillUnmount() {
        //clearInterval(this.progBarInterval);
    }

    updateProgBar = async () => {
        if (this.progBarInnerRef.current && this.knobRef.current) {
            const progress = await this.props.getTrackProgress();
            const progressPercent = `${progress * 100}%`;
            this.progBarInnerRef.current.style.width = progressPercent;
            this.knobRef.current.style.left = progressPercent;
        }
    }

    handleProgBarClick = (e) => {
        const { clientX } = e;
        const { left, width } = this.progBarOuterRef.current.getBoundingClientRect();
        const progressDecimal = (clientX - left) / width;
        const constrainedProgressDecimal = Math.max(0, Math.min(1, progressDecimal));
        this.props.setTrackProgress(constrainedProgressDecimal);
    }

    render() {
        return (
            <div className="player-controls">
                <FontAwesomeIcon 
                    icon={faRandom} 
                    onClick={() => this.props.setShuffle(!this.props.isShuffled)}
                    className={this.props.isShuffled ? 'active' : ''} 
                />
                <FontAwesomeIcon icon={faStepBackward} onClick={this.props.skipBackwards} />
                <FontAwesomeIcon 
                    icon={this.props.isPlaying ? faPauseCircle : faPlayCircle} 
                    onClick={this.props.isPlaying ? this.props.pausePlayer: this.props.resumePlayer}
                />
                <FontAwesomeIcon icon={faStepForward} onClick={this.props.skipForwards} />
                <span className="player-controls__repeat">
                    <FontAwesomeIcon 
                        icon={faSyncAlt}
                        onClick={() => this.props.setRepeat(PlayerControls.repeatModeMap[this.props.repeat])} 
                        className={this.props.repeat === 'off' ? '' : 'active'}
                    />
                    <span style={{ display: this.props.repeat === 'track' ? 'initial' : 'none' }}>1</span>
                </span>
                <TrackProgressBar 
                    getTrackProgress={this.props.getTrackProgress}
                    setTrackProgress={this.props.setTrackProgress}
                /> 
            </div>
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
        setRepeat: ActionCreators.setRepeat,
        resumePlayer: ActionCreators.resumePlayer,
        pausePlayer: ActionCreators.pausePlayer,
        skipForwards: ActionCreators.skipForwards,
        skipBackwards: ActionCreators.skipBackwards
    }
)(PlayerControls);



/*

<span 
                    className="player-controls__prog-bar-outer" 
                    ref={this.progBarOuterRef}
                    onClick={this.handleProgBarClick}
                >
                    <div className="player-controls__prog-bar-inner" ref={this.progBarInnerRef}></div>
                    <span className="player-controls__prog-bar-knob" ref={this.knobRef}>
                        <span className="player-controls__prog-bar-knob-inner"></span>
                    </span>
                </span>

*/