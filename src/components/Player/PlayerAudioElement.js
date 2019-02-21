import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

class PlayerAudioElement extends Component {
    constructor(props) {
        super(props);
        this.audio = new Audio();
        this.audio.addEventListener('ended', this.handleEnded);
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
            this.audio.pause();
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

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
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

export default connect(
    mapStateToProps,
    {
        skipForwards: ActionCreators.skipForwards
    }
)(PlayerAudioElement);