import * as actionTypes from '../actionTypes';
import { storeAlbums, storeArtists, storePlaylists, storeCategories } from './entityActions';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

const fetchHighlightsRequest = () => ({
    type: actionTypes.FETCH_HIGHLIGHTS_REQUEST
});

const fetchHighlightsSuccess = (timestamp) => ({
    type: actionTypes.FETCH_HIGHLIGHTS_SUCCESS,
    payload: {
        timestamp
    }
});

const fetchHighlightsFailed = (error) => ({
    type: actionTypes.FETCH_HIGHLIGHTS_FAILED,
    payload: {
        error
    }
});

const fetchHighlightsAbort = () => ({
    type: actionTypes.FETCH_HIGHLIGHTS_ABORT
});

const storeHighlights = (newReleaseIds, featuredPlaylistIds, categoryIds) => ({
    type: actionTypes.STORE_HIGHLIGHTS,
    payload: {
        newReleaseIds,
        featuredPlaylistIds,
        categoryIds
    }
});

const artistSchema = new schema.Entity('artists');
const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
const playlistSchema = new schema.Entity('playlists');
const categorySchema = new schema.Entity('categories');


// const normalizedData = normalize(response.data.albums.items, [albumSchema]);
// const normalizedData = normalize(response.data.playlists.items, [playlistSchema]);
// const normalizedData = normalize(response.data.categories.items, [categorySchema]);


const fetchNewReleases = (token, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/browse/new-releases?country=${market}&limit=50`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return normalize(response.data.albums.items, [albumSchema]); 
    } catch (err) {
        throw new Error(err);
    }
}

const fetchFeaturedPlaylists = (token, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/browse/featured-playlists?country=${market}&limit=50`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return normalize(response.data.playlists.items, [playlistSchema]);
    } catch (err) {
        throw new Error(err);
    }
}

const fetchCategories = (token, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/browse/categories?country=${market}&limit=50`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return normalize(response.data.categories.items, [categorySchema]);
    } catch (err) {
        throw new Error(err);
    }
}

const destructureData = (resolvedPromiseArr) => {
    const [
        {
            entities: {
                albums: albumEntities,
                artists: artistEntities
            },
            result: newReleaseIds
        },
        {
            entities: {
                playlists: playlistEntities
            },
            result: featuredPlaylistIds
        },
        {
            entities: {
                categories: categoryEntities
            },
            result: categoryIds
        }
    ] = resolvedPromiseArr;

    return {
        artistEntities,
        albumEntities,
        playlistEntities,
        categoryEntities,
        newReleaseIds,
        featuredPlaylistIds,
        categoryIds
    }
}

export const newFetchHighlights = () => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const market = getState().user.country;
    const highlights = getState().highlights;
    if (highlights.fullHighlightsFetched && Date.now() - highlights.lastFetchedAt <= 3600000) {
        return dispatch(fetchHighlightsAbort());
    }
    dispatch(fetchHighlightsRequest());

    try {
        const results = await Promise.all([
            dispatch(fetchNewReleases(token, market)),
            dispatch(fetchFeaturedPlaylists(token, market)),
            dispatch(fetchCategories(token, market))
        ]);
        const {
            albumEntities,
            artistEntities,
            playlistEntities,
            categoryEntities,
            newReleaseIds,
            featuredPlaylistIds,
            categoryIds
        } = destructureData(results);
        dispatch(storeAlbums(albumEntities));
        dispatch(storeArtists(artistEntities));
        dispatch(storePlaylists(playlistEntities));
        dispatch(storeCategories(categoryEntities));
        dispatch(storeHighlights(newReleaseIds, featuredPlaylistIds, categoryIds));
        dispatch(fetchHighlightsSuccess(Date.now()));
    } catch (err) {
        dispatch(fetchHighlightsFailed(err));
    }

}
