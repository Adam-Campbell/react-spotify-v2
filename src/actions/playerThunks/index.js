import * as actionTypes from '../../actionTypes';
import axios from 'axios';
import { 
    SDKSelectTrack, 
    SDKResumePlayer, 
    SDKPausePlayer,
    SDKSkipForwards,
    SDKSkipBackwards,
    SDKSetShuffle,
    SDKSetRepeat
} from './SDKActions';
import { 
    standardSelectTrack,
    standardResumePlayer,
    standardPausePlayer,
    standardSkipForwards,
    standardSkipBackwards,
    standardSetShuffle,
    standardSetRepeat
} from './standardActions';

export const selectTrack = ({ deviceId, contextURI, contextId, trackURI, trackId }) => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        // dispatch the related SDK action
        return dispatch(SDKSelectTrack(
            deviceId,
            contextURI,
            contextId,
            trackURI
        ));
    } else {
        // dispatch the related non SDK action
        return dispatch(standardSelectTrack({ contextURI, contextId, trackURI, trackId }));
    }
}

export const resumePlayer = () => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        // dispatch the related SDK action
        return dispatch(SDKResumePlayer());
    } else {
        // dispatch the related non SDK action
        return dispatch(standardResumePlayer());
    }
}

export const pausePlayer = () => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        return dispatch(SDKPausePlayer());
    } else {
        return dispatch(standardPausePlayer());
    }
}

export const skipForwards = () => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        return dispatch(SDKSkipForwards());
    } else {
        return dispatch(standardSkipForwards());
    }
}

export const skipBackwards = () => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        return dispatch(SDKSkipBackwards());
    } else {
        return dispatch(standardSkipBackwards());
    }
}

export const setRepeat = (newRepeatValue) => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        return dispatch(SDKSetRepeat(newRepeatValue));
    } else {
        return dispatch(standardSetRepeat(newRepeatValue));
    }
}

export const setShuffle = (shuffleValue) => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        return dispatch(SDKSetShuffle(shuffleValue));
    } else {
        return dispatch(standardSetShuffle(shuffleValue));
    }
}