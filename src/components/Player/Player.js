import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { skipForwards } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerControls from './PlayerControls';
import PlayerVolumeControl from './PlayerVolumeControl';
import { getPlayerInfo, getCurrentTrackPreviewURL } from '../../selectors';

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
        if (this.props.SDKAvailable) {
            return;
        }

        // if previous track preview url doesn't match the new track preview url or previous context uri 
        // doesn't match the new context uri, then update the src with the new preview url.
        if (
            prevProps.trackId !== this.props.trackId ||
            prevProps.contextURI !== this.props.contextURI
        ) {
            this.audio.src = this.props.trackPreviewURL;
        }

        // if isPlaying is true in the new props, then call play on the audio (will work whether the audio
        // was already playing or not).
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
            // else call the skipForwards function, which will update the store.
        } else {
            this.props.skipForwards();
        }
    }

    /**
     * Gets the current track progress, either by querying the spotify player instance or the audio element,
     * depending on which is being used.
     */
    getTrackProgress = async () => {
        if (this.props.SDKAvailable) {
            const playerState = await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.getCurrentState();
            return playerState ? playerState.position / playerState.duration : 0;
        } else {
            return this.audio.duration ? this.audio.currentTime / this.audio.duration : 0;
        }
    }

    /**
     * Set the current track progress, either by using the setter on the spotify player instance or on 
     * the audio element.
     * @param {Number} progressDecimal - a decimal representing the desired progression within the track.
     */
    setTrackProgress = async (progressDecimal) => {
        if (this.props.SDKAvailable) {
            const playerState = await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.getCurrentState();
            window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.seek(playerState.duration * progressDecimal);
        } else {
            this.audio.currentTime = this.audio.duration * progressDecimal;
        }
    }

    /**
     * Sets the player volumen, either by using the setter on the player instance or on the audio element.
     * @param {Number} newVolume - the desired volume as a decimal.
     */
    setPlayerVolume = async (newVolume) => {
        if (this.props.SDKAvailable) {
           window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.setVolume(newVolume); 
        } else {
            this.audio.volume = newVolume;
        }
    }

    /**
     * Toggles the player between being displayed as a bar along the bottom of the screen and being displayed
     * full screen. Only has a visible effect at smaller viewport widths, at larger viewport widths the player
     * displays the same regardless of isFullScreen.
     */
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

const mapStateToProps = (state) => {
    const player = getPlayerInfo(state);
    return {
        isActive: player.isActive,
        SDKAvailable: player.SDKAvailable,
        isPlaying: player.isPlaying,
        isShuffled: player.isShuffled,
        repeat: player.repeat,
        trackId: player.trackId,
        contextURI: player.contextURI,
        contextTrackIds: player.contextTrackIds,
        shuffledContextTrackIds: player.shuffledContextTrackIds,
        trackPreviewURL: getCurrentTrackPreviewURL(state)
    };
};

export const ConnectedPlayer = connect(
    mapStateToProps,
    { skipForwards }
)(Player);
