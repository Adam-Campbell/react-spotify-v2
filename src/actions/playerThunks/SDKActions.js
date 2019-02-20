import * as actionTypes from '../../actionTypes';
import axios from 'axios';

const SDKSelectTrackSuccess = (contextURI) => ({
    type: actionTypes.SDK_SELECT_TRACK_SUCCESS,
    payload: {
        contextURI
    }
});

const SDKSelectTrackFailed = (error) => ({
    type: actionTypes.SDK_SELECT_TRACK_FAILED,
    payload: {
        error
    }
});

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

export const SDKSelectTrack = (deviceId, contextURI, contextId, trackURI) => async (dispatch, getState) => {
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
            dispatch(SDKSelectTrackSuccess(contextURI));
        } else if (contextType === 'artist' || contextType === 'user') {
            const response = await makeReqWithURIList(token, deviceId, contextId, contextType, trackURI, state);
            dispatch(SDKSelectTrackSuccess(contextURI));
        }
        
    } catch (err) {
        dispatch(SDKSelectTrackFailed(err));
    }
}