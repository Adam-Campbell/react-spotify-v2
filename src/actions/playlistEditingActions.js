import * as actionTypes from '../actionTypes';
import axios from 'axios';


const updatePlaylistNameRequest = (playlistId) => ({
    type: actionTypes.UPDATE_PLAYLIST_NAME_REQUEST,
    payload: {
        playlistId
    }
});

const updatePlaylistNameSuccess = (newPlaylistName, playlistId) => ({
    type: actionTypes.UPDATE_PLAYLIST_NAME_SUCCESS,
    payload: {
        newPlaylistName, 
        playlistId
    }
});

const updatePlaylistNameFailed = (error, playlistId) => ({
    type: actionTypes.UPDATE_PLAYLIST_NAME_FAILED,
    payload: {
        error,
        playlistId
    }
});

export const updatePlaylistName = (newPlaylistName, playlistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    try {
        const response = await axios.request(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'PUT',
            data: {
                name: newPlaylistName
            }
        });
        if (response.status === 200) {
            dispatch(updatePlaylistNameSuccess(
                newPlaylistName,
                playlistId
            ));
        }
    } catch (err) {
        dispatch (updatePlaylistNameFailed(err, playlistId));
    }
}


const updatePlaylistImageRequest = (playlistId) => ({
    type: actionTypes.UPDATE_PLAYLIST_IMAGE_REQUEST,
    payload: {
        playlistId
    }
});

const updatePlaylistImageSuccess = (imageURI, playlistId) => ({
    type: actionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS,
    payload: {
        imageURI,
        playlistId
    }
});

const updatePlaylistImageFailed = (error, playlistId) => ({
    type: actionTypes.UPDATE_PLAYLIST_IMAGE_FAILED,
    payload: {
        error,
        playlistId
    }
});

export const updatePlaylistImage = (imageData, playlistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const formattedImageData = imageData.replace(/^data:image\/(jpeg|jpg|png);base64,/, '')
    try {
        const response = await axios.request(
            `https://api.spotify.com/v1/playlists/${playlistId}/images`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'image/jpeg'
            },
            method: 'PUT',
            data: formattedImageData
        });
        if (response.status === 202) {
            dispatch(updatePlaylistImageSuccess(
                imageData,
                playlistId
            ));
        }
    } catch (err) {
        dispatch(updatePlaylistImageFailed(
            err, 
            playlistId
        ));
    }
}


const addTrackToPlaylistRequest = (trackId, playlistId) => ({
    type: actionTypes.ADD_TRACK_TO_PLAYLIST_REQUEST,
    payload: {
        trackId,
        playlistId
    }
});

const addTrackToPlaylistSuccess = (trackId, playlistId) => ({
    type: actionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS,
    payload: {
        trackId,
        playlistId
    }
});

const addTrackToPlaylistFailed = (error, trackId, playlistId) => ({
    type: actionTypes.ADD_TRACK_TO_PLAYLIST_FAILED,
    payload: {
        error,
        trackId,
        playlistId
    }
});

export const addTrackToPlaylist = (trackURI, trackId, playlistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    try {
        const response = await axios.request(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            data: {
                uris: [ trackURI ]
            }
        });
        if (response.status === 201) {
            dispatch(addTrackToPlaylistSuccess(
                trackId,
                playlistId
            ));
        }
    } catch (err) {
        dispatch(addTrackToPlaylistFailed(
            err, 
            trackId,
            playlistId
        ));
    }
}


const removeTrackFromPlaylistRequest = (trackId, playlistId) => ({
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST_REQUEST
});

const removeTrackFromPlaylistSuccess = (trackId, playlistId) => ({
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST_SUCCESS,
    payload: {
        trackId,
        playlistId
    }
});

const removeTrackFromPlaylistFailed = (error, playlistId) => ({
    type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST_FAILED,
    payload: {
        error,
        playlistId
    }
});

export const removeTrackFromPlaylist = (trackURI, trackId, playlistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    try {
        const response = await axios.request(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            method: 'DELETE',
            data: {
                tracks: [
                    { uri: trackURI }
                ]
            }
        });
        if (response.status === 200) {
            dispatch(removeTrackFromPlaylistSuccess(trackId, playlistId))
        }
    } catch (err) {
        dispatch(removeTrackFromPlaylistFailed(err));
    }
}
