import * as actionTypes from '../actionTypes';
import API from '../api';

const followArtistRequest = (artistId) => ({
    type: actionTypes.FOLLOW_ARTIST_REQUEST,
    payload: {
        artistId
    }
});

const followArtistSuccess = (artistId) => ({
    type: actionTypes.FOLLOW_ARTIST_SUCCESS,
    payload: {
        artistId
    }
});

const followArtistFailed = (error, artistId) => ({
    type: actionTypes.FOLLOW_ARTIST_FAILED,
    payload: {
        error,
        artistId
    }
});

export const followArtist = (artistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    try {
        const response = await API.followArtist(token, artistId);
        if (response.status === 204) {
            dispatch(followArtistSuccess(artistId));
        }
    } catch (err) {
        dispatch(followArtistFailed(err, artistId));
    }
}


const unfollowArtistRequest = (artistId) => ({
    type: actionTypes.UNFOLLOW_ARTIST_REQUEST,
    payload: {
        artistId
    }
});

const unfollowArtistSuccess = (artistId) => ({
    type: actionTypes.UNFOLLOW_ARTIST_SUCCESS,
    payload: {
        artistId
    }
});

const unfollowArtistFailed = (error, artistId) => ({
    type: actionTypes.UNFOLLOW_ARTIST_FAILED,
    payload: {
        error,
        artistId
    }
});

export const unfollowArtist = (artistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    try {
        const response = await API.unfollowArtist(token, artistId);
        if (response.status === 204) {
            dispatch(unfollowArtistSuccess(artistId));
        }
    } catch (err) {
        dispatch(unfollowArtistFailed(err, artistId));
    }
}



const followPlaylistRequest = (playlistId) => ({
    type: actionTypes.FOLLOW_PLAYLIST_REQUEST,
    payload: {
        playlistId
    }
});

const followPlaylistSuccess = (playlistId) => ({
    type: actionTypes.FOLLOW_PLAYLIST_SUCCESS,
    payload: {
        playlistId
    }
});

const followPlaylistFailed = (error, playlistId) => ({
    type: actionTypes.FOLLOW_PLAYLIST_FAILED,
    payload: {
        error,
        playlistId
    }
});

export const followPlaylist = (playlistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    try {
        const response = await API.followPlaylist(token, playlistId);
        if (response.status === 200) {
            dispatch(followPlaylistSuccess(playlistId));
        }
    } catch (err) {
        dispatch(followPlaylistFailed(err, playlistId));
    }
}


const unfollowPlaylistRequest = (playlistId) => ({
    type: actionTypes.UNFOLLOW_PLAYLIST_REQUEST,
    payload: {
        playlistId
    }
});

const unfollowPlaylistSuccess = (playlistId) => ({
    type: actionTypes.UNFOLLOW_PLAYLIST_SUCCESS,
    payload: {
        playlistId
    }
});

const unfollowPlaylistFailed = (error, playlistId) => ({
    type: actionTypes.UNFOLLOW_PLAYLIST_FAILED,
    payload: {
        error,
        playlistId
    }
});

export const unfollowPlaylist = (playlistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    try {
        const response = await API.unfollowPlaylist(token, playlistId);
        if (response.status === 200) {
            dispatch(unfollowPlaylistSuccess(playlistId));
        }
    } catch (err) {
        dispatch(unfollowPlaylistFailed(err, playlistId));
    }
}