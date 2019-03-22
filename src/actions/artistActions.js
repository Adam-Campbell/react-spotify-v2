import * as actionTypes from '../actionTypes';
import { storeArtists, storeAlbums, storeTracks } from './entityActions';
import API from '../api';
import { handleNormalize, entryPoints } from '../utils';

const fetchArtistRequest = (artistId, loadingRequired) => ({
    type: actionTypes.FETCH_ARTIST_REQUEST,
    payload: { 
        artistId,
        loadingRequired
    }
});

const fetchArtistSuccess = (artistId, timestamp) => ({
    type: actionTypes.FETCH_ARTIST_SUCCESS,
    payload: {
        artistId,
        timestamp
    }
});

const fetchArtistAbort = (artistId) => ({
    type: actionTypes.FETCH_ARTIST_ABORT,
    payload: { 
        artistId 
    }
});

const fetchArtistFailed = (error, artistId) => ({
    type: actionTypes.FETCH_ARTIST_FAILED,
    payload: {
        error,
        artistId
    }
});

const storeArtistTopTrackIds = (trackIds, ownerId) => ({
    type: actionTypes.STORE_ARTIST_TOP_TRACK_IDS,
    payload: {
        trackIds,
        ownerId
    }
});

const storeArtistAlbumIds = (albumIds, ownerId) => ({
    type: actionTypes.STORE_ARTIST_ALBUM_IDS,
    payload: {
        albumIds,
        ownerId
    }
});

const storeArtistRelatedArtistIds = (relatedArtistIds, ownerId) => ({
    type: actionTypes.STORE_ARTIST_RELATED_ARTIST_IDS,
    payload: {
        relatedArtistIds,
        ownerId
    }
});

const fetchArtistProfile = async (token, artistId) => {
    try {
        const response = await API.getArtistProfile(token, artistId);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const fetchArtistsTopTracks = async (token, artistId, market) => {
    try {
        const response = await API.getArtistTopTracks(token, artistId, market);
        return handleNormalize(response.data.tracks, entryPoints.tracks);
    } catch (err) {
        throw new Error(err);
    }
};

const fetchArtistsRelatedArtists = async (token, artistId) => {
    try {
        const response = await API.getArtistRelatedArtists(token, artistId);
        return handleNormalize(response.data.artists, entryPoints.artists);
    } catch (err) {
        throw new Error(err);
    }
}

const fetchArtistsAlbums = async (token, artistId, market) => {
    try {
        const response = await API.getArtistAlbums(token, artistId, market);
        return handleNormalize(response.data.items, entryPoints.albums);
    } catch (err) {
        throw new Error(err);
    }
}

const destructureData = (resolvedPromiseArr, artistId) => {
    const [
        profileData, 
        { 
            entities: {
                artists: topTrack_artistEntities,
                albums: topTrack_albumEntities,
                tracks: topTrack_trackEntities
            },
            result: topTrackIds
        }, 
        {
            entities: {
                artists: relatedArtist_artistEntities
            },
            result: relatedArtistIds
        }, 
        {
            entities: {
                artists: album_artistEntities,
                albums: album_albumEntities
            },
            result: albumIds
        }
    ] = resolvedPromiseArr;

    return {
        artistEntities: {
            ...album_artistEntities,
            ...relatedArtist_artistEntities,
            ...topTrack_artistEntities,
            [artistId]: profileData
        },
        albumEntities: {
            ...topTrack_albumEntities,
            ...album_albumEntities
        },
        trackEntities: topTrack_trackEntities,
        topTrackIds,
        relatedArtistIds,
        albumIds
    };
}

export const fetchArtist = (artistId, isPrefetched=false) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const market = getState().user.country;
    const artistFetchedAt = getState().artists.timestamps[artistId];
    if (artistFetchedAt && Date.now() - artistFetchedAt <= 3600000) {
        return dispatch(fetchArtistAbort(artistId));
    }
    dispatch(fetchArtistRequest(artistId, !isPrefetched));
    try {
        const results = await Promise.all([
            fetchArtistProfile(token, artistId),
            fetchArtistsTopTracks(token, artistId, market),
            fetchArtistsRelatedArtists(token, artistId),
            fetchArtistsAlbums(token, artistId, market)
        ]);
        const { 
            artistEntities, 
            albumEntities, 
            trackEntities, 
            topTrackIds,
            relatedArtistIds,
            albumIds
        } = destructureData(results, artistId);
        dispatch(storeArtists(artistEntities));
        dispatch(storeAlbums(albumEntities));
        dispatch(storeTracks(trackEntities));
        dispatch(storeArtistTopTrackIds(topTrackIds, artistId));
        dispatch(storeArtistAlbumIds(albumIds, artistId));
        dispatch(storeArtistRelatedArtistIds(relatedArtistIds, artistId));
        dispatch(fetchArtistSuccess(artistId, Date.now()));
    } catch (err) {
        dispatch(fetchArtistFailed(err, artistId));
    }  
}
