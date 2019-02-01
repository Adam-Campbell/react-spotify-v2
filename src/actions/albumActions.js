import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { getUsersMarket } from './userActions';
import { cloneDeep } from 'lodash';

const fetchAlbumRequest = (albumId) => ({
    type: actionTypes.FETCH_ALBUM_REQUEST,
    payload: {
        albumId
    } 
});

const fetchAlbumSuccess = (albumId, timestamp) => ({
    type: actionTypes.FETCH_ALBUM_SUCCESS,
    payload: {
        albumId,
        timestamp
    }
});

const fetchAlbumFailed = (albumId, error) => ({
    type: actionTypes.FETCH_ALBUM_FAILED,
    payload: {
        albumId, 
        error
    }
});

const fetchAlbumAbort = (albumId) => ({
    type: actionTypes.FETCH_ALBUM_ABORT,
    payload: {
        albumId
    }
});

const storeAlbum = (albumObject, trackObjects, artistObjects) => ({
    type: actionTypes.STORE_ALBUM,
    payload: {
        albumObject,
        trackObjects,
        artistObjects
    }
});

const fetchAlbumInfo = (token, albumId, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/albums/${albumId}?market=${market}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const artistSchema = new schema.Entity('artists');
        const trackSchema = new schema.Entity('tracks', 
            { artists: [artistSchema] },
            {
                processStrategy: (value, parent, key) => {
                    const cloned = cloneDeep(value);
                    cloned.album = parent.id;
                    return cloned;
                }
            }
        )
        const albumSchema = new schema.Entity(
            'albums', 
            { 
                artists: [artistSchema],
                tracks: [trackSchema]
            },
            {
                processStrategy: (value, parent, key) => {
                    const cloned = cloneDeep(value);
                    cloned.tracks = [ ...cloned.tracks.items ];
                    return cloned;
                }
            }
        );
        const normalizedData = normalize(response.data, albumSchema);
        dispatch(storeAlbum(
            normalizedData.entities.albums,
            normalizedData.entities.tracks,
            normalizedData.entities.artists
        ));
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchAlbum = (albumId) => async (dispatch, getState) => {
    dispatch(fetchAlbumRequest(albumId));
    const token = getState().accessToken.token;
    const market = getState().user.country || await dispatch(getUsersMarket(token));
    const album = getState().albums.albumData[albumId];
    if (album && album.fullAlbumFetched) {
        return dispatch(fetchAlbumAbort(albumId));
    }
    dispatch(fetchAlbumInfo(token, albumId, market))
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchAlbumSuccess(albumId, timestamp));
    }, (err) => {
        dispatch(fetchAlbumFailed(albumId, err));
    });
}