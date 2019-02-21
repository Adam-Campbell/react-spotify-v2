import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

const IsomorphicPlayerContext = React.createContext();

/*

It needs to expose the following methods:

selectTrack
playTrack
pauseTrack
skipForwards
skipBackwards
seekPosition
setShuffle
setRepeat


It also needs a way to determine what kind of player is being used - the SDK or the audio elem. 


*/

export class IsomorphicPlayer extends Component {

    constructor(props) {
        super(props);
        this.playerRef = props.playerRef;
    }

    get playerInstance() {
        return window.player;
    }

    resume = async () => {
        //console.log(this.playerRef);
        await this.playerInstance.resume();
    };

    pause = async () => {
        await this.playerInstance.pause();
        this.props.updatePlayerState('', false);
    }

    nextTrack = async () => {
        await this.playerInstance.nextTrack();
    }

    previousTrack = async () => {
        await this.playerInstance.previousTrack();
    }

    render() {
        return (
            <IsomorphicPlayerContext.Provider value={{
                resume: this.resume,
                pause: this.pause,
                nextTrack: this.nextTrack,
                previousTrack: this.previousTrack
            }}>
                { this.props.children }
            </IsomorphicPlayerContext.Provider>
        );
    }
}

export const IsomorphicPlayerProvider = connect(undefined, {
    updatePlayerState: ActionCreators.updatePlayerState
})(IsomorphicPlayer)

export const IsomorphicPlayerConsumer = IsomorphicPlayerContext.Consumer;
