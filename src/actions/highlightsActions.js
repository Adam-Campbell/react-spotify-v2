import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { getUsersMarket } from './userActions';
import { cloneDeep } from 'lodash';

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

const storeNewReleases = (albumObjects, albumIds, artistObjects) => ({
    type: actionTypes.STORE_NEW_RELEASES,
    payload: {
        albumObjects,
        albumIds,
        artistObjects
    }
});

const storeFeaturedPlaylists = (playlistObjects, playlistIds) => ({
    type: actionTypes.STORE_FEATURED_PLAYLISTS,
    payload: {
        playlistObjects,
        playlistIds
    }
});

const storeCategories = (categoryObjects, categoryIds) => ({
    type: actionTypes.STORE_CATEGORIES,
    payload: {
        categoryObjects,
        categoryIds
    }
});

const fetchNewReleases = (token, market) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/browse/new-releases?country=${market}&limit=50`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const artistSchema = new schema.Entity('artists');
        const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
        const normalizedData = normalize(response.data.albums.items, [albumSchema]);
        dispatch(storeNewReleases(
            normalizedData.entities.albums,
            normalizedData.result,
            normalizedData.entities.artists
        ));
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
        const playlistSchema = new schema.Entity('playlists');
        const normalizedData = normalize(response.data.playlists.items, [playlistSchema]);
        dispatch(storeFeaturedPlaylists(
            normalizedData.entities.playlists,
            normalizedData.result
        ));
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
        const categorySchema = new schema.Entity('categories');
        const normalizedData = normalize(response.data.categories.items, [categorySchema]);
        dispatch(storeCategories(
            normalizedData.entities.categories,
            normalizedData.result
        ));
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchHighlights = () => async (dispatch, getState) => {
    dispatch(fetchHighlightsRequest());
    const token = getState().accessToken.token;
    const market = getState().user.country || await dispatch(getUsersMarket(token));
    const highlights = getState().highlights;
    if (highlights.fullHighlightsFetched && Date.now() - highlights.lastFetchedAt <= 3600000) {
        return dispatch(fetchHighlightsAbort());
    }
    Promise.all([
        dispatch(fetchNewReleases(token, market)),
        dispatch(fetchFeaturedPlaylists(token, market)),
        dispatch(fetchCategories(token, market))
    ])
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchHighlightsSuccess(timestamp));
    }, (err) => {
        dispatch(fetchHighlightsFailed(err));
    })
}