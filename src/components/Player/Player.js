import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerControls from './PlayerControls';
import PlayerVolumeControl from './PlayerVolumeControl';

class Player extends Component {

    static propTypes = {
        navIsOpen: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);
        this.audio = new Audio();
        this.audio.addEventListener('ended', this.handleEnded);
        this.state = {
            isFullScreen: false
        };
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        // if SDKAvailable is true then the SDK player is active so the audio element shouldn't be doing
        // anything.
        if (this.props.SDKAvailable) return;

        // if previous track preview url doesn't match the new track preview url or previous context uri 
        // doesn't match the new context uri, then pause the audio and update the src.
        if (
            prevProps.trackId !== this.props.trackId ||
            prevProps.contextURI !== this.props.contextURI
        ) {
            //this.audio.pause();
            this.audio.src = this.props.trackPreviewURL;
        }

        // if isPlaying is true in the new props, then call play on the audio.
        if (this.props.isPlaying) {
            this.audio.play();
            // else if isPlaying is false in the new props, then call pause on the audio.
        } else {
            this.audio.pause();
        }   
    }

    handleEnded = () => {
        // if repeat is set to 'track', then just move the audio back to the start of the track and call play
        if (this.props.repeat === 'track') {
            this.audio.currentTime = 0;
            this.audio.play();
        } else {
            this.props.skipForwards();
        }
    }

    getTrackProgress = async () => {
        if (this.props.SDKAvailable) {
            const playerState = await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.getCurrentState();
            return playerState ? playerState.position / playerState.duration : 0;
        } else {
            return this.audio.duration ? this.audio.currentTime / this.audio.duration : 0;
        }
    }

    setTrackProgress = async (progressDecimal) => {
        if (this.props.SDKAvailable) {
            const playerState = await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.getCurrentState();
            window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.seek(playerState.duration * progressDecimal);
        } else {
            this.audio.currentTime = this.audio.duration * progressDecimal;
        }
    }

    setPlayerVolume = async (newVolume) => {
        if (this.props.SDKAvailable) {
           window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.setVolume(newVolume); 
        } else {
            this.audio.volume = newVolume;
        }
    }

    toggleFullScreen = () => {
        this.setState(prevState => ({
            isFullScreen: !prevState.isFullScreen
        }));
    }

    render() {
        const { isFullScreen } = this.state;
        const { isActive, navIsOpen } = this.props;
        return (
            <section 
                className={
                    `player
                    ${isFullScreen ? 'full-screen-player' : ''} 
                    ${navIsOpen ? 'nav-open' : ''}
                    ${isActive ? 'show-player' : ''}`
                }
            >
                <div className={`player__inner-container ${isActive ? 'show-player' : ''}`}>
                    <FontAwesomeIcon icon={faCaretUp} onClick={this.toggleFullScreen} />
                    <PlayerTrackInfo />
                    <PlayerControls 
                        getTrackProgress={this.getTrackProgress} 
                        setTrackProgress={this.setTrackProgress}
                    />
                    <PlayerVolumeControl 
                        setPlayerVolume={this.setPlayerVolume}
                    />
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    isActive: state.player.isActive,
    SDKAvailable: state.player.SDKAvailable,
    isPlaying: state.player.isPlaying,
    isShuffled: state.player.isShuffled,
    repeat: state.player.repeat,
    trackId: state.player.trackId,
    contextURI: state.player.contextURI,
    contextTrackIds: state.player.contextTrackIds,
    shuffledContextTrackIds: state.player.shuffledContextTrackIds,
    trackPreviewURL: state.tracks[state.player.trackId] ? 
                     state.tracks[state.player.trackId].preview_url :
                     ''
});

export const ConnectedPlayer = connect(
    mapStateToProps,
    {
        skipForwards: ActionCreators.skipForwards
    }
)(Player);