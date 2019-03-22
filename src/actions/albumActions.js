import * as actionTypes from '../actionTypes';
import { storeAlbums, storeTracks, storeArtists } from './entityActions';
import API from '../api';
import { handleNormalize, entryPoints } from '../utils';

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

export const fetchAlbum = (albumId, isPrefetched=false) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const market = getState().user.country;
    const albumFetchedAt = getState().albums.timestamps[albumId];
    if (albumFetchedAt) {
        return dispatch(fetchAlbumAbort(albumId));
    }
    dispatch(fetchAlbumRequest(albumId, !isPrefetched));

    try {
        const response = await API.getAlbum(token, albumId, market);
        const normalizedData = handleNormalize(response.data, entryPoints.complexAlbum);
        const albumObject = normalizedData.entities.albums[albumId];
        const albumTrackIds = albumObject.tracks;
        delete albumObject.tracks;
        dispatch(storeAlbums({ albumId: albumObject }));
        dispatch(storeTracks(normalizedData.entities.tracks));
        dispatch(storeArtists(normalizedData.entities.artists));
        dispatch(storeAlbumTrackIds(albumTrackIds, albumId));
        dispatch(fetchAlbumSuccess(albumId, Date.now()));
    } catch (err) {
        dispatch(fetchAlbumFailed(err, albumId));
    }
};
