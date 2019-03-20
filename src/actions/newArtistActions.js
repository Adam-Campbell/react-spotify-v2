import * as actionTypes from '../actionTypes';
import { storeArtists, storeAlbums, storeTracks } from './entityActions';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

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

const storeArtistTopTrackIds = (topTrackIds, ownerId) => ({
    type: actionTypes.STORE_ARTIST_TOP_TRACK_IDS,
    payload: {
        topTrackIds,
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

const artistSchema = new schema.Entity('artists');
const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
const trackSchema = new schema.Entity('tracks', { album: albumSchema, artists: [artistSchema] });


const fetchArtistProfile = (token, artistId) => async (dispatch) => {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const fetchArtistsTopTracks = (token, artistId, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=${market}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return normalize(response.data.tracks, [trackSchema]);
    } catch (err) {
        throw new Error(err);
    }
};

const fetchArtistsRelatedArtists = (token, artistId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/artists/${artistId}/related-artists`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return normalize(response.data.artists, [artistSchema]);
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
        return normalize(response.data.items, [albumSchema]);
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

export const newFetchArtist = (artistId, isPrefetched=false) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const market = getState().user.country;
    const artistFetchedAt = getState().artists.timestamps[artistId];
    if (artistFetchedAt && Date.now() - artistFetchedAt <= 3600000) {
        return dispatch(fetchArtistAbort(artistId));
    }
    dispatch(fetchArtistRequest(artistId, !isPrefetched));
    try {
        const results = await Promise.all([
            dispatch(fetchArtistProfile(token, artistId)),
            dispatch(fetchArtistsTopTracks(token, artistId, market)),
            dispatch(fetchArtistsRelatedArtists(token, artistId)),
            dispatch(fetchArtistsAlbums(token, artistId, market))
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





/*

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
    ] = await Promise.all([
        dispatch(fetchArtistProfile(token, artistId)),
        dispatch(fetchArtistsTopTracks(token, artistId, market)),
        dispatch(fetchArtistsRelatedArtists(token, artistId)),
        dispatch(fetchArtistsAlbums(token, artistId, market))
    ]);
    
    const allArtistEntities = {
        ...album_artistEntities,
        ...relatedArtist_artistEntities,
        ...topTrack_artistEntities,
        [artistId]: profileData
    };
    const allAlbumEntities = {
        ...topTrack_albumEntities,
        ...album_albumEntities
    };
    const allTrackEntities = {
        ...topTrack_trackEntities
    };
    const completeData = {
        artistEntities: allArtistEntities,
        albumEntities: allAlbumEntities,
        trackEntities: allTrackEntities,
        topTrackIds,
        relatedArtistIds,
        albumIds
    };
    console.log(completeData);
    dispatch(storeArtists(allArtistEntities));
    dispatch(storeAlbums(allAlbumEntities));
    dispatch(storeTracks(allTrackEntities));



*/









