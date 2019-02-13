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