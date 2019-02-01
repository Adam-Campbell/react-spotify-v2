import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

const fetchCategoriesPlaylistsRequest = (categoryId) => ({
    type: actionTypes.FETCH_CATEGORIES_PLAYLISTS_REQUEST,
    payload: {
        categoryId
    }
});

const fetchCategoriesPlaylistsSuccess = (categoryId) => ({
    type: actionTypes.FETCH_CATEGORIES_PLAYLISTS_SUCCESS,
    payload: {
        categoryId
    }
});

const fetchCategoriesPlaylistsFailed = (categoryId, error) => ({
    type: actionTypes.FETCH_CATEGORIES_PLAYLISTS_FAILED,
    payload: {
        categoryId,
        error
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
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=50`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        const playlistSchema = new schema.Entity('playlists');
        const normalizedData = normalize(response.data.playlists.items, [playlistSchema]);
        console.log(normalizedData);
        dispatch(storeCategoriesPlaylists(
            normalizedData.entities.playlists,
            normalizedData.result,
            categoryId
        ));
        dispatch(fetchCategoriesPlaylistsSuccess(categoryId));
    } catch (err) {
        dispatch(fetchCategoriesPlaylistsFailed(categoryId, err));
    }
}
