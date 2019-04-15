import * as actionTypes from '../../actionTypes';
import API from '../../api';

export const SDKUpdatePlayerState = (trackId, isPlaying, isShuffled, repeatMode) => ({
    type: actionTypes.SDK_UPDATE_PLAYER_STATE,
    payload: {
        trackId,
        isPlaying,
        isShuffled,
        repeatMode
    }
});

const SDKSelectTrackSuccess = (newContextURI) => ({
    type: actionTypes.SDK_SELECT_TRACK_SUCCESS,
    payload: {
        newContextURI
    }
});

const SDKSelectTrackFailed = (error) => ({
    type: actionTypes.SDK_SELECT_TRACK_FAILED,
    payload: {
        error
    }
});

/**
 * Grabs a list of all track URIs for the current context and makes a request to the player to update to that
 * context. This is used for switching to artists top tracks and current user top tracks contexts - the player
 * does not recognize these as proper contexts and so the context must be simulated by manually grabbing the
 * URIs for all of the tracks and supplying them to the player. 
 * @param {String} token - the current users auth token.
 * @param {String} deviceId - the current device id.
 * @param {String} contextId - the id of the context to switch to.
 * @param {String} contextType - the type of context.
 * @param {String} trackURI - the specific URI of the track that playback should start at.
 * @param {Object} state - a full copy of the state so that the function can look through state and find
 * the specified context. 
 */
const makeReqWithURIList = (token, deviceId, contextId, contextType, trackURI, state) => {
    let allTrackURIs;
    if (contextType === 'artist') {
        allTrackURIs = state.artists.topTrackIds[contextId].map(id => state.tracks[id].uri);
    } else if (contextType === 'user') {
        allTrackURIs = state.user.recentTrackIds.map(id => state.tracks[id].uri);
    }
    return API.selectTrackWithURIList(token, deviceId, trackURI, allTrackURIs);
}

/**
 * Switches the player over to a new track and context. Depending on the type of context being created, it can
 * either interface directly with the API, or will potentially have to delegate to another function to perform
 * some additional work. 
 * @param {String} contextURI - the URI of the context to switch to.
 * @param {String} contextId - the ID of the context to swotch to.
 * @param {String} trackURI - the URI of the track to begin playback with.
 */
export const SDKSelectTrack = (contextURI, contextId, trackURI) => async (dispatch, getState) => {
    try {
        const state = getState();
        const token = state.accessToken.token;
        const deviceId = state.player.deviceId;
        // determine context type from the contextURI string. Have to split it and then work backwards from
        // the end because the amount of data appearing before the part we're interested changes in different
        // contexts, but the amount of data after the part we're interested in is constant. 
        const splitContext = contextURI.split(':');
        const contextType = splitContext[splitContext.length - 2];

        if (contextType === 'album' || contextType === 'playlist') {
            const response = await API.selectTrackWithContext(token, deviceId, trackURI, contextURI);
            dispatch(SDKSelectTrackSuccess(contextURI));
        } else if (contextType === 'artist' || contextType === 'user') {
            const response = await makeReqWithURIList(token, deviceId, contextId, contextType, trackURI, state);
            dispatch(SDKSelectTrackSuccess(contextURI));
        }
        
    } catch (err) {
        dispatch(SDKSelectTrackFailed(err));
    }
}


const SDKResumePlayerSuccess = () => ({
    type: actionTypes.SDK_RESUME_PLAYER_SUCCESS
});

const SDKResumePlayerFailed = (error) => ({
    type: actionTypes.SDK_RESUME_PLAYER_FAILED,
    payload: {
        error
    }
});

export const SDKResumePlayer = () => async (dispatch, getState) => {
    try {
        await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.resume();
        dispatch(SDKResumePlayerSuccess());
    } catch (err) {
        dispatch(SDKResumePlayerFailed(err));
    }
};


const SDKPausePlayerSuccess = () => ({
    type: actionTypes.SDK_PAUSE_PLAYER_SUCCESS
});

const SDKPausePlayerFailed = (error) => ({
    type: actionTypes.SDK_PAUSE_PLAYER_FAILED,
    payload: {
        error
    }
});

export const SDKPausePlayer = () => async (dispatch) => {
    try {
        await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.pause();
        dispatch(SDKPausePlayerSuccess());
    } catch (err) {
        dispatch(SDKPausePlayerFailed(err));
    }
};


const SDKSkipForwardsSuccess = () => ({
    type: actionTypes.SDK_SKIP_FORWARDS_SUCCESS
});

const SDKSkipForwardsFailed = (error) => ({
    type: actionTypes.SDK_SKIP_FORWARDS_FAILED,
    payload: {
        error
    }
});

export const SDKSkipForwards = () => async (dispatch) => {
    try {
        await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.nextTrack();
        dispatch(SDKSkipForwardsSuccess())
    } catch (err) {
        dispatch(SDKSkipForwardsFailed(err));
    }
}

const SDKSkipBackwardsSuccess = () => ({
    type: actionTypes.SDK_SKIP_BACKWARDS_SUCCESS
});

const SDKSkipBackwardsFailed = (error) => ({
    type: actionTypes.SDK_SKIP_BACKWARDS_FAILED,
    payload: {
        error
    }
});

export const SDKSkipBackwards = () => async (dispatch) => {
    try {
        await window._REACTIFY_GLOBAL_PLAYER_INSTANCE_.previousTrack();
        dispatch(SDKSkipBackwardsSuccess())
    } catch (err) {
        dispatch(SDKSkipBackwardsFailed(err));
    }
}


const SDKSetShuffleSuccess = (shuffleValue) => ({
    type: actionTypes.SDK_SET_SHUFFLE_SUCCESS,
    payload: {
        shuffleValue
    }
});

const SDKSetShuffleFailed = (error, shuffleValue) => ({
    type: actionTypes.SDK_SET_SHUFFLE_FAILED,
    payload: {
        error,
        shuffleValue
    }
});

export const SDKSetShuffle = (shuffleValue) => async (dispatch, getState) => {
    const state = getState();
    const token = state.accessToken.token;
    const deviceId = state.player.deviceId;
    try {
        const response = await API.setShuffle(token, deviceId, shuffleValue);
        dispatch(SDKSetShuffleSuccess(shuffleValue));
    } catch (err) {
        dispatch(SDKSetShuffleFailed(err, shuffleValue));
    }
}

const SDKSetRepeatSuccess = (newRepeatValue) => ({
    type: actionTypes.SDK_SET_REPEAT_SUCCESS,
    payload: {
        newRepeatValue
    }
});

const SDKSetRepeatFailed = (error, attemptedRepeatValue) => ({
    type: actionTypes.SDK_SET_REPEAT_FAILED,
    payload: {
        error,
        attemptedRepeatValue
    }
});

export const SDKSetRepeat = (newRepeatValue) => async (dispatch, getState) => {
    const state = getState();
    const token = state.accessToken.token;
    const deviceId = state.player.deviceId;
    try {
        const response = await API.setRepeat(token, deviceId, newRepeatValue);
        dispatch(SDKSetRepeatSuccess(newRepeatValue));
    } catch (err) {
        dispatch(SDKSetRepeatFailed(err, newRepeatValue));
    }
}