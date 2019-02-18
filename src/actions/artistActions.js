import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { getUsersMarket } from './userActions';

const fetchArtistRequest = (artistId) => ({
    type: actionTypes.FETCH_ARTIST_REQUEST,
    payload: {
        artistId
    }
});

const fetchArtistSuccess = (artistId, timestamp) => ({
    type: actionTypes.FETCH_ARTIST_SUCCESS,
    payload: {
        artistId,
        timestamp
    }
});

const fetchArtistFailed = (error, artistId) => ({
    type: actionTypes.FETCH_ARTIST_FAILED,
    payload: {
        error, 
        artistId
    }
});

const fetchArtistAbort = (artistId) => ({
    type: actionTypes.FETCH_ARTIST_ABORT,
    payload: {
        artistId
    }
});

const storeArtistsProfile = (artistProfileObject, artistId) => ({
    type: actionTypes.STORE_ARTISTS_PROFILE,
    payload: {
        artistProfileObject,
        artistId
    }
});

const storeArtistsTopTracks = (trackObjects, trackIds, artistId, artistObjects, albumObjects) => ({
    type: actionTypes.STORE_ARTISTS_TOP_TRACKS,
    payload: {
        trackObjects,
        trackIds,
        artistId, 
        artistObjects,
        albumObjects
    }
});

const storeArtistsRelatedArtists = (relatedArtistObjects, relatedArtistIds, artistId) => ({
    type: actionTypes.STORE_ARTISTS_RELATED_ARTISTS,
    payload: {
        relatedArtistObjects,
        relatedArtistIds,
        artistId
    }
});

const storeArtistsAlbums = (albumObjects, albumIds, artistId, artistObjects) => ({
    type: actionTypes.STORE_ARTISTS_ALBUMS,
    payload: {
        albumObjects,
        albumIds,
        artistId, 
        artistObjects
    }
});

const fetchArtistsInfo = (token, artistId) => async (dispatch) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(storeArtistsProfile(response.data, artistId));
    } catch (err) {
        throw new Error(err);
    }
}

const fetchArtistsTopTracks = (token, artistId, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${market}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const artistSchema = new schema.Entity('artists');
        const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
        const trackSchema = new schema.Entity('tracks', { album: albumSchema, artists: [artistSchema] });
        const normalizedData = normalize(response.data.tracks, [trackSchema]);
        dispatch(storeArtistsTopTracks(
            normalizedData.entities.tracks,
            normalizedData.result,
            artistId,
            normalizedData.entities.artists,
            normalizedData.entities.albums
        ));
    } catch (err) {
        throw new Error(err);
    }
}


const fetchArtistsRelatedArtists = (token, artistId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const artistSchema = new schema.Entity('artists');
        const normalizedData = normalize(response.data.artists, [artistSchema]);
        dispatch(storeArtistsRelatedArtists(
            normalizedData.entities.artists,
            normalizedData.result,
            artistId
        ));
    } catch (err) {
        throw new Error(err);
    }
}

const fetchArtistsAlbums = (token, artistId, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/albums?album_type=album,single&limit=50&market=${market}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const artistSchema = new schema.Entity('artists');
        const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
        const normalizedData = normalize(response.data.items, [albumSchema]);
        dispatch(storeArtistsAlbums(
            normalizedData.entities.albums,
            normalizedData.result,
            artistId,
            normalizedData.entities.artists
        ));
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchArtist = (artistId) => async (dispatch, getState) => {
    dispatch(fetchArtistRequest(artistId));
    const token = getState().accessToken.token;
    const market = getState().user.country || await dispatch(getUsersMarket(token));
    const artist = getState().artists.artistData[artistId];
    // Abort the fetch if the full data for this artist is already in the store, and it was
    // fetched within the last hour
    if (artist && artist.fullProfileFetched && Date.now() - artist.lastFetchedAt <= 3600000) {
        return dispatch(fetchArtistAbort(artistId));
    }
    return Promise.all([
        dispatch(fetchArtistsInfo(token, artistId)),
        dispatch(fetchArtistsTopTracks(token, artistId, market)),
        dispatch(fetchArtistsRelatedArtists(token, artistId)),
        dispatch(fetchArtistsAlbums(token, artistId, market))
    ])
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchArtistSuccess(artistId, timestamp));
    }, (err) => {
        dispatch(fetchArtistFailed(artistId, err));
    })

}