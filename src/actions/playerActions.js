import * as actionTypes from '../actionTypes';
import axios from 'axios';

const selectTrackRequest = () => ({
    type: actionTypes.SELECT_TRACK_REQUEST
});

const selectTrackSuccess = (newContextURI) => ({
    type: actionTypes.SELECT_TRACK_SUCCESS,
    payload: {
        newContextURI
    }
});

const selectTrackFailed = (error) => ({
    type: actionTypes.SELECT_TRACK_FAILED,
    payload: {
        error
    }
});



/*

We need two possible functions that selectTrack can call, depending on the type of context.

We can call them makeReqWithContext and makeReqWithURIList for now.

makeReqWithContext will be used for albums and playlists
makeReqWithURIList will be used for artists and users

First we need to check the uri type - uristring.split(':')[1]  (this is fine for now but maybe use regex later on)

Then we call the correct function.

makeReqWithContext just needs to make the request with the contet uri and track uri given to it 

makeReqWithURIList needs to construct the uri list first, then make the request with the uri list, using the uri
of the selected track in the offset. 


*/

const makeReqWithContext = (token, deviceId, contextURI, trackURI) => {
    return axios.request(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        data: {
            context_uri: contextURI,
            offset: {
                uri: trackURI
            }
        }
    });
};

const makeReqWithURIList = (token, deviceId, contextId, contextType, trackURI, state) => {
    let allTrackURIs;
    if (contextType === 'artist') {
        allTrackURIs = state.artists.artistData[contextId].topTrackIds.map(id => state.tracks[id].uri);
    } else if (contextType === 'user') {
        allTrackURIs = state.user.recentTracksIds.map(id => state.tracks[id].uri);
    }
    return axios.request(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        data: {
            uris: [ ...allTrackURIs ],
            offset: {
                uri: trackURI
            }
        }
    });
}



const selectTrack = (deviceId, contextURI, contextId, trackURI) => async (dispatch, getState) => {
    console.log(contextURI, trackURI);
    try {
        const state = getState();
        const token = state.accessToken.token;
        // determine context type from the contextURI string. Have to split it and then work backwards from
        // the end because the amount of data appearing before the part we're interested changes in different
        // contexts, but the amount of data after the part we're interested in is constant. 
        const splitContext = contextURI.split(':');
        const contextType = splitContext[splitContext.length - 2];

        if (contextType === 'album' || contextType === 'playlist') {
            const response = await makeReqWithContext(token, deviceId, contextURI, trackURI);
            dispatch(selectTrackSuccess(contextURI));
        } else if (contextType === 'artist' || contextType === 'user') {
            const response = await makeReqWithURIList(token, deviceId, contextId, contextType, trackURI, state);
            dispatch(selectTrackSuccess(contextURI));
        }
        
    } catch (err) {
        dispatch(selectTrackFailed(err));
    }
}


export const updatePlayerState = (trackId, isPlaying) => ({
    type: actionTypes.UPDATE_PLAYER_STATE,
    payload: {
        trackId,
        isPlaying
    }
});


const setShuffleRequest = (shuffleValue) => ({
    type: actionTypes.SET_SHUFFLE_REQUEST,
    payload: {
        shuffleValue
    }
});

const setShuffleSuccess = (shuffleValue) => ({
    type: actionTypes.SET_SHUFFLE_SUCCESS,
    payload: {
        shuffleValue
    }
});

const setShuffleFailed = (error, shuffleValue) => ({
    type: actionTypes.SET_SHUFFLE_FAILED,
    payload: {
        error,
        shuffleValue
    }
});

export const setShuffle = (shuffleValue) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const deviceId = window._REACTIFY_GLOBAL_DEVICE_ID_;
    try {
        const response = await axios.request(
            `https://api.spotify.com/v1/me/player/shuffle?device_id=${deviceId}&state=${shuffleValue}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'PUT'
        });
        console.log(response.data);
        dispatch(setShuffleSuccess(shuffleValue));
    } catch (err) {
        dispatch(setShuffleFailed(err, shuffleValue));
    }
}


const setRepeatRequest = (newRepeatValue) => ({
    type: actionTypes.SET_REPEAT_REQUEST,
    payload: {
        newRepeatValue
    }
});

const setRepeatSuccess = (newRepeatValue) => ({
    type: actionTypes.SET_REPEAT_SUCCESS,
    payload: {
        newRepeatValue
    }
});

const setRepeatFailed = (error, attemptedRepeatValue) => ({
    type: actionTypes.SET_REPEAT_FAILED,
    payload: {
        error,
        attemptedRepeatValue
    }
});

export const setRepeat = (newRepeatValue) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const deviceId = window._REACTIFY_GLOBAL_DEVICE_ID_;
    try {
        const response = await axios.request(
            `https://api.spotify.com/v1/me/player/repeat?state=${newRepeatValue}&device_id=${deviceId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'PUT'
        });
        dispatch(setRepeatSuccess(newRepeatValue));
    } catch (err) {
        dispatch(setRepeatFailed(err, newRepeatValue));
    }
}


export const confirmSDKAvailable = () => ({
    type: actionTypes.CONFIRM_SDK_AVAILABLE
});