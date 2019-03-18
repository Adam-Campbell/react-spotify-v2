import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

const fetchCategoryRequest = (categoryId) => ({
    type: actionTypes.FETCH_CATEGORY_REQUEST,
    payload: {
        categoryId
    }
});

const fetchCategorySuccess = (categoryId, timestamp) => ({
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    payload: {
        categoryId,
        timestamp
    }
});

const fetchCategoryFailed = (categoryId, error) => ({
    type: actionTypes.FETCH_CATEGORY_FAILED,
    payload: {
        categoryId,
        error
    }
});

const fetchCategoryAbort = (categoryId) => ({
    type: actionTypes.FETCH_CATEGORY_ABORT,
    payload: {
        categoryId
    }
});

const storeCategoryInfo = (categoryObject, categoryId) => ({
    type: actionTypes.STORE_CATEGORY_INFO,
    payload: {
        categoryObject, 
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

const fetchCategoryInfo = (categoryId, token) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/browse/categories/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(storeCategoryInfo(
            response.data,
            response.data.id
        ));
    } catch (err) {
        throw new Error(err);
    }
}

const fetchCategoriesPlaylists = (categoryId, token) => async (dispatch) => {
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
    } catch (err) {
        throw new Error(err);
    }
}


// export const _fetchCategoriesPlaylists = (categoryId) => async (dispatch, getState) => {
//     dispatch(fetchCategoriesPlaylistsRequest(categoryId));
//     const token = getState().accessToken.token;
//     const category = getState().categories.categoryData[categoryId];
//     if (category && category.fullCategoryFetched && Date.now() - category.lastFetchedAt <= 3600000) {
//         return dispatch(fetchCategoriesPlaylistsAbort(categoryId));
//     }
//     try {
//         const response = await axios.get(
//             `https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?limit=50`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         });
//         const playlistSchema = new schema.Entity('playlists');
//         const normalizedData = normalize(response.data.playlists.items, [playlistSchema]);
//         dispatch(storeCategoriesPlaylists(
//             normalizedData.entities.playlists,
//             normalizedData.result,
//             categoryId
//         ));
//         const timestamp = Date.now();
//         dispatch(fetchCategoriesPlaylistsSuccess(categoryId, timestamp));
//     } catch (err) {
//         dispatch(fetchCategoriesPlaylistsFailed(categoryId, err));
//     }
// }


export const fetchCategory = (categoryId) => (dispatch, getState) => {
    dispatch(fetchCategoryRequest());
    const token = getState().accessToken.token;
    //const category = getState().categories.categoryData[categoryId];
    // if (category && category.fullCategoryFetched && Date.now() - category.lastFetchedAt <= 3600000) {
    //     return dispatch(fetchCategoryAbort(categoryId));
    // }
    const categoryFetchedAt = getState().categoryFetchedAt[categoryId];
    if (categoryFetchedAt && Date.now() - categoryFetchedAt <= 3600000) {
        return dispatch(fetchCategoryAbort(categoryId));
    }
    return Promise.all([
        dispatch(fetchCategoryInfo(categoryId, token)),
        dispatch(fetchCategoriesPlaylists(categoryId, token))
    ])
    .then(() => {
        const timestamp = Date.now();
        dispatch(fetchCategorySuccess(categoryId, timestamp));
    }, (err) => {
        dispatch(fetchCategoryFailed(categoryId, err));
    });
}