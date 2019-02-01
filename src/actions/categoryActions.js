import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

const fetchCategoriesPlaylistsRequest = (categoryId) => ({
    type: actionTypes.FETCH_CATEGORIES_PLAYLISTS_REQUEST,
    payload: {
        categoryId
    }
});

const fetchCategoriesPlaylistsSuccess = (categoryId, timestamp) => ({
    type: actionTypes.FETCH_CATEGORIES_PLAYLISTS_SUCCESS,
    payload: {
        categoryId,
        timestamp
    }
});

const fetchCategoriesPlaylistsFailed = (categoryId, error) => ({
    type: actionTypes.FETCH_CATEGORIES_PLAYLISTS_FAILED,
    payload: {
        categoryId,
        error
    }
});

const fetchCategoriesPlaylistsAbort = (categoryId) => ({
    type: actionTypes.FETCH_CATEGORIES_PLAYLISTS_ABORT,
    payload: {
        categoryId
    }
});

const storeCategoriesPlaylists = (playlistObjects, playlistIds, categoryId) => ({
    type: actionTypes.STORE_CATEGORIES_PLAYLISTS,
    payload: {
        playlistObjects,
        playlistIds,
        categoryId
    }
});


export const fetchCategoriesPlaylists = (categoryId) => async (dispatch, getState) => {
    dispatch(fetchCategoriesPlaylistsRequest(categoryId));
    const token = getState().accessToken.token;
    const category = getState().categories.categoryData[categoryId];
    if (category && category.fullCategoryFetched && Date.now() - category.lastFetchedAt <= 3600000) {
        return dispatch(fetchCategoriesPlaylistsAbort(categoryId));
    }
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=50`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const playlistSchema = new schema.Entity('playlists');
        const normalizedData = normalize(response.data.playlists.items, [playlistSchema]);
        dispatch(storeCategoriesPlaylists(
            normalizedData.entities.playlists,
            normalizedData.result,
            categoryId
        ));
        const timestamp = Date.now();
        dispatch(fetchCategoriesPlaylistsSuccess(categoryId, timestamp));
    } catch (err) {
        dispatch(fetchCategoriesPlaylistsFailed(categoryId, err));
    }
}
