import * as actionTypes from '../actionTypes';
import { storeAlbums, storeTracks, storeArtists } from './entityActions';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { cloneDeep } from 'lodash';

const fetchAlbumRequest = (albumId, loadingRequired) => ({
    type: actionTypes.FETCH_ALBUM_REQUEST,
    payload: {
        albumId,
        loadingRequired
    } 
});

const fetchAlbumSuccess = (albumId, timestamp) => ({
    type: actionTypes.FETCH_ALBUM_SUCCESS,
    payload: {
        albumId,
        timestamp
    }
});

const fetchAlbumFailed = (error, albumId) => ({
    type: actionTypes.FETCH_ALBUM_FAILED,
    payload: { 
        error,
        albumId
    }
});

const fetchAlbumAbort = (albumId) => ({
    type: actionTypes.FETCH_ALBUM_ABORT,
    payload: {
        albumId
    }
});

const storeAlbumTrackIds = (albumTrackIds, ownerId) => ({
    type: actionTypes.STORE_ALBUM_TRACK_IDS,
    payload: {
        albumTrackIds,
        ownerId
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
        const albumObject = normalizedData.entities.albums[albumId];
        const albumTrackIds = albumObject.tracks;
        delete albumObject.tracks;
        dispatch(storeAlbums({ albumId: albumObject }));
        dispatch(storeTracks(normalizedData.entities.tracks));
        dispatch(storeArtists(normalizedData.entities.artists));
        dispatch(storeAlbumTrackIds(albumTrackIds, albumId));
    } catch (err) {
        throw new Error(err);
    }
}

export const newFetchAlbum = (albumId, isPrefetched=false) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const market = getState().user.country;
    const albumFetchedAt = getState().albums.timestamps[albumId];
    if (albumFetchedAt) {
        return dispatch(fetchAlbumAbort(albumId));
    }
    dispatch(fetchAlbumRequest(albumId, !isPrefetched));
    return dispatch(fetchAlbumInfo(token, albumId, market))
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchAlbumSuccess(albumId, timestamp));
    }, (err) => {
        dispatch(fetchAlbumFailed(err, albumId));
    });
}