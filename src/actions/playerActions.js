import * as actionTypes from '../actionTypes';
import axios from 'axios';

const selectTrackRequest = () => ({
    type: actionTypes.SELECT_TRACK_REQUEST
});

const selectTrackSuccess = () => ({
    type: actionTypes.SELECT_TRACK_SUCCESS
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



export const selectTrack = (deviceId, contextURI, contextId, trackURI) => async (dispatch, getState) => {
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
            dispatch(selectTrackSuccess());
        } else if (contextType === 'artist' || contextType === 'user') {
            const response = await makeReqWithURIList(token, deviceId, contextId, contextType, trackURI, state);
            dispatch(selectTrackSuccess());
        }
        
    } catch (err) {
        dispatch(selectTrackFailed(err));
    }
}