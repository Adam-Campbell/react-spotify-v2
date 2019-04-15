import * as actionTypes from '../actionTypes';
import API from '../api'; 

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
        const response = await API.updatePlaylistName(token, playlistId, newPlaylistName);
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
        const response = await API.updatePlaylistImage(token, playlistId, formattedImageData);
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
        const response = await API.addTrackToPlaylist(token, playlistId, trackURI);
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
        const response = await API.removeTrackFromPlaylist(token, playlistId, trackURI);
        if (response.status === 200) {
            dispatch(removeTrackFromPlaylistSuccess(trackId, playlistId))
        }
    } catch (err) {
        dispatch(removeTrackFromPlaylistFailed(err));
    }
}


const createPlaylistSuccess = (playlistObject, playlistId) => ({
    type: actionTypes.CREATE_PLAYLIST_SUCCESS,
    payload: {
        playlistObject, 
        playlistId
    }
});

const createPlaylistFailed = (error) => ({
    type: actionTypes.CREATE_PLAYLIST_FAILED,
    payload: {
        error
    }
});


export const createPlaylist = (playlistName) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const currentUserId = getState().user.id;
    try {
        const response = await API.createPlaylist(token, currentUserId, playlistName);
        const playlistObject = response.data;
        dispatch(createPlaylistSuccess(
            playlistObject,
            playlistObject.id
        ));
    } catch (err) {
        dispatch(createPlaylistFailed(err));
    }
}
