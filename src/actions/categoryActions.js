import * as actionTypes from '../actionTypes';
import { storeCategories, storePlaylists } from './entityActions';
import { normalize, schema } from 'normalizr';
import axios from 'axios';

const fetchCategoryRequest = (categoryId, loadingRequired) => ({
    type: actionTypes.FETCH_CATEGORY_REQUEST,
    payload: {
        categoryId,
        loadingRequired
    }
});

const fetchCategorySuccess = (categoryId, timestamp) => ({
    type: actionTypes.FETCH_CATEGORY_SUCCESS,
    payload: {
        categoryId,
        timestamp
    }
});

const fetchCategoryFailed = (error, categoryId) => ({
    type: actionTypes.FETCH_CATEGORY_FAILED,
    payload: {
        error,
        categoryId
    }
});

const fetchCategoryAbort = (categoryId) => ({
    type: actionTypes.FETCH_CATEGORY_ABORT,
    payload: {
        categoryId
    }
});

const storeCategoryPlaylistIds = (playlistIds, ownerId) => ({
    type: actionTypes.STORE_CATEGORY_PLAYLIST_IDS,
    payload: {
        playlistIds,
        ownerId
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
        // return {
        //     [response.data.id]: response.data
        // };
        return response.data;
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
        return normalize(response.data.playlists.items, [playlistSchema]);
    } catch (err) {
        throw new Error(err);
    }
}

const destructureData = (resolvedPromiseArr) => {
    const [
        categoryEntity,
        {
            entities: {
                playlists: playlistEntities 
            },
            result: categoryPlaylistIds
        }
    ] = resolvedPromiseArr;
    return {
        categoryEntity,
        playlistEntities,
        categoryPlaylistIds
    };
};

export const fetchCategory = (categoryId, isPrefetched=false) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const categoryFetchedAt = getState().categories.timestamps[categoryId];
    if (categoryFetchedAt && Date.now() - categoryFetchedAt <= 3600000) {
        return dispatch(fetchCategoryAbort(categoryId));
    }
    dispatch(fetchCategoryRequest(categoryId, !isPrefetched));

    try {
        const results = await Promise.all([
            dispatch(fetchCategoryInfo(categoryId, token)),
            dispatch(fetchCategoriesPlaylists(categoryId, token))
        ]);
        const {
            categoryEntity,
            playlistEntities,
            categoryPlaylistIds
        } = destructureData(results);
        dispatch(storeCategories({ [categoryId]: categoryEntity }));
        dispatch(storePlaylists(playlistEntities));
        dispatch(storeCategoryPlaylistIds(categoryPlaylistIds, categoryId));
        dispatch(fetchCategorySuccess(categoryId, Date.now()));
    } catch (err) {
        dispatch(fetchCategoryFailed(err, categoryId));
    }
}
