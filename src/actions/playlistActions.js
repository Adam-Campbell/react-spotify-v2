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

const fetchPlaylistSuccess = (playlistId) => ({
    type: actionTypes.FETCH_PLAYLIST_SUCCESS,
    payload: {
        playlistId
    }
});

const fetchPlaylistFailed = (playlistId, error) => ({
    type: actionTypes.FETCH_PLAYLIST_FAILED,
    payload: {
        playlistId,
        error
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

export const fetchPlaylist = (playlistId) => async (dispatch, getState) => {
    dispatch(fetchPlaylistRequest(playlistId));
    const token = getState().accessToken.token;
    const market = getState().user.country || await dispatch(getUsersMarket(token));
    Promise.all([
        dispatch(fetchPlaylistInfo(token, playlistId, market))
    ])
    .then(() => {
        dispatch(fetchPlaylistSuccess(playlistId));
    }, (err) => {
        dispatch(fetchPlaylistFailed(playlistId, err));
    });
}