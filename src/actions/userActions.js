import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { cloneDeep } from 'lodash';

const fetchUserRequest = () => ({
    type: actionTypes.FETCH_USER_REQUEST
});

const fetchUserSuccess = () => ({
    type: actionTypes.FETCH_USER_SUCCESS
});

const fetchUserFailed = (error) => ({
    type: actionTypes.FETCH_USER_FAILED,
    payload: {
        error
    }
});

const storeUsersProfile = (usersProfile) => ({
    type: actionTypes.STORE_USERS_PROFILE,
    payload: {
        usersProfile
    }
});

const storeUsersTopArtists = (artistObjects, artistIds) => ({
    type: actionTypes.STORE_USERS_TOP_ARTISTS,
    payload: {
        artistObjects,
        artistIds
    }
});

const storeUsersRecentTracks = (trackObjects, trackIds, artistObjects, albumObjects) => ({
    type: actionTypes.STORE_USERS_RECENT_TRACKS,
    payload: {
        trackObjects,
        trackIds,
        artistObjects,
        albumObjects
    }
});

const storeUsersPlaylists = (playlistObjects, playlistIds) => ({
    type: actionTypes.STORE_USERS_PLAYLISTS,
    payload: {
        playlistObjects,
        playlistIds
    }
});

const setMarket = (market) => ({
    type: actionTypes.SET_MARKET,
    payload: {
        market
    }
});

export const getUsersMarket = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const market = response.data.country;
        dispatch(setMarket(market));
        return market;
    } catch (err) {
        throw new Error(err);
    }
}

const fetchUsersProfile = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(storeUsersProfile(response.data));
    } catch (err) {
        throw new Error(err);
    }
}

const fetchUsersTopArtists = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const artistIds = response.data.items.map(artist => artist.id);
        const artistObjects = response.data.items.reduce((collection, artist) => {
            return {
                ...collection,
                [artist.id]: { ...artist }
            };
        }, {});
        dispatch(storeUsersTopArtists(artistObjects, artistIds));
    } catch (err) {
        throw new Error(err);
    }
}

const fetchUsersRecentTracks = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const strippedData = response.data.items.map(item => item.track);
        const artistSchema = new schema.Entity('artists');
        const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
        const trackSchema = new schema.Entity('tracks', { artists: [artistSchema], album: albumSchema });
        const normalizedData = normalize(strippedData, [trackSchema]);
        dispatch(storeUsersRecentTracks(
            normalizedData.entities.tracks,
            normalizedData.result,
            normalizedData.entities.artists,
            normalizedData.entities.albums
        ));
    } catch (err) {
        throw new Error(err);
    }
}

const fetchUsersPlaylists = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const playlistSchema = new schema.Entity('playlists', {}, {
            processStrategy: (value, parent, key) => {
                const cloned = cloneDeep(value);
                delete cloned.tracks;
                return cloned;
            }
        });
        const normalizedData = normalize(response.data.items, [playlistSchema]);
        dispatch(storeUsersPlaylists(
            normalizedData.entities.playlists,
            normalizedData.result
        ));
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchUser = () => async (dispatch, getState) => {
    dispatch(fetchUserRequest())
    const token = getState().accessToken.token;
    Promise.all([
        dispatch(fetchUsersProfile(token)),
        dispatch(fetchUsersTopArtists(token)),
        dispatch(fetchUsersRecentTracks(token)),
        dispatch(fetchUsersPlaylists(token))
    ])
    .then(() => {
        dispatch(fetchUserSuccess());
    }, (err) => {
        dispatch(fetchUserFailed(err));
    });
}