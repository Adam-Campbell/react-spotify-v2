import * as actionTypes from '../actionTypes';
import axios from 'axios';

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
    // Put requests to this Spotify endpoint only seem to work when the method param on the request is set to
    // 'PUT' rather than 'put'. However axios.put will always set the method param to 'put' and this can't be
    // overridden, so instead I have used axios.request and manually set the method param to 'PUT'.
    try {
        const response = await axios.request(`https://api.spotify.com/v1/me/following?type=artist`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            data: {
                'ids': [ artistId ]
            } 
        });
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
        const response = await axios.delete(`https://api.spotify.com/v1/me/following?type=artist`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                'ids': [ artistId ]
            } 
        });
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
    // Put requests to this Spotify endpoint only seem to work when the method param on the request is set to
    // 'PUT' rather than 'put'. However axios.put will always set the method param to 'put' and this can't be
    // overridden, so instead I have used axios.request and manually set the method param to 'PUT'.
    try {
        const response = await axios.request(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'PUT'
        });
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
        const response = await axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        });
        if (response.status === 200) {
            dispatch(unfollowPlaylistSuccess(playlistId));
        }
    } catch (err) {
        dispatch(unfollowPlaylistFailed(err, playlistId));
    }
}