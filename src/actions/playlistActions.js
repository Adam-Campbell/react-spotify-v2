import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { getUsersMarket } from './userActions';
import { cloneDeep } from 'lodash';

const fetchPlaylistRequest = (playlistId) => ({
    type: actionTypes.FETCH_PLAYLIST_REQUEST,
    payload: {
        playlistId
    }
});

const fetchPlaylistSuccess = (playlistId, timestamp) => ({
    type: actionTypes.FETCH_PLAYLIST_SUCCESS,
    payload: {
        playlistId,
        timestamp
    }
});

const fetchPlaylistFailed = (playlistId, error) => ({
    type: actionTypes.FETCH_PLAYLIST_FAILED,
    payload: {
        playlistId,
        error
    }
});

const fetchPlaylistAbort = (playlistId) => ({
    type: actionTypes.FETCH_PLAYLIST_ABORT,
    payload: {
        playlistId
    }
});

const storePlaylist = (playlistObject, trackObjects, artistObjects, albumObjects) => ({
    type: actionTypes.STORE_PLAYLIST,
    payload: {
        playlistObject, 
        trackObjects,
        artistObjects, 
        albumObjects
    }
});

const storePlaylistFollowStatus = (playlistId, isFollowing) => ({
    type: actionTypes.STORE_PLAYLIST_FOLLOW_STATUS,
    payload: {
        playlistId,
        isFollowing
    }
});


const fetchPlaylistInfo = (token, playlistId, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}?market=${market}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const artistSchema = new schema.Entity('artists');
        const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
        const trackSchema = new schema.Entity('tracks', { artists: [artistSchema], album: albumSchema });
        const playlistSchema = new schema.Entity(
            'playlists', 
            {
                tracks: [trackSchema] 
            },
            {
                processStrategy: (value, parent, key) => {
                    const cloned = cloneDeep(value);
                    cloned.tracks = cloned.tracks.items.map(item => item.track);
                    return cloned;
                }
            }
        );
        const normalizedData = normalize(response.data, playlistSchema);
        dispatch(storePlaylist(
            normalizedData.entities.playlists,
            normalizedData.entities.tracks,
            normalizedData.entities.artists,
            normalizedData.entities.albums
        ));
    } catch (err) {
        throw new Error(err);
    }
}

const checkIfFollowing = (token, playlistId, currentUserId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${currentUserId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(storePlaylistFollowStatus(
            playlistId,
            response.data[0]
        ));
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchPlaylist = (playlistId) => async (dispatch, getState) => {
    dispatch(fetchPlaylistRequest(playlistId));
    const token = getState().accessToken.token;
    const market = getState().user.country || await dispatch(getUsersMarket(token));
    const playlist = getState().playlists.playlistData[playlistId];
    const currentUserId = getState().user.id;
    if (playlist && playlist.fullPlaylistFetched && Date.now() - playlist.lastFetchedAt <= 3600000) {
        return dispatch(fetchPlaylistAbort(playlistId));
    }
    return Promise.all([
        dispatch(fetchPlaylistInfo(token, playlistId, market)),
        dispatch(checkIfFollowing(token, playlistId, currentUserId))
    ])
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchPlaylistSuccess(playlistId, timestamp));
    }, (err) => {
        dispatch(fetchPlaylistFailed(playlistId, err));
    });
};

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