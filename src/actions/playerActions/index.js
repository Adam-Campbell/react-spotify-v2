import * as actionTypes from '../../actionTypes';
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

export { SDKUpdatePlayerState } from './SDKActions';

export const selectTrack = ({ contextURI, contextId, trackURI, trackId }) => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    const isPremium = state.user.product === 'premium';
    if (SDKAvailable && isPremium) {
        // dispatch the related SDK action
        return dispatch(SDKSelectTrack(
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
    const isPremium = state.user.product === 'premium';
    if (SDKAvailable && isPremium) {
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
    const isPremium = state.user.product === 'premium';
    if (SDKAvailable && isPremium) {
        return dispatch(SDKPausePlayer());
    } else {
        return dispatch(standardPausePlayer());
    }
}

export const skipForwards = () => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    const isPremium = state.user.product === 'premium';
    if (SDKAvailable && isPremium) {
        return dispatch(SDKSkipForwards());
    } else {
        return dispatch(standardSkipForwards());
    }
}

export const skipBackwards = () => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    const isPremium = state.user.product === 'premium';
    if (SDKAvailable && isPremium) {
        return dispatch(SDKSkipBackwards());
    } else {
        return dispatch(standardSkipBackwards());
    }
}

export const setRepeat = (newRepeatValue) => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    const isPremium = state.user.product === 'premium';
    if (SDKAvailable && isPremium) {
        return dispatch(SDKSetRepeat(newRepeatValue));
    } else {
        return dispatch(standardSetRepeat(newRepeatValue));
    }
}

export const setShuffle = (shuffleValue) => async (dispatch, getState) => {
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    const isPremium = state.user.product === 'premium';
    if (SDKAvailable && isPremium) {
        return dispatch(SDKSetShuffle(shuffleValue));
    } else {
        return dispatch(standardSetShuffle(shuffleValue));
    }
}

export const confirmSDKAvailable = (deviceId) => ({
    type: actionTypes.CONFIRM_SDK_AVAILABLE,
    payload: {
        deviceId
    }
});