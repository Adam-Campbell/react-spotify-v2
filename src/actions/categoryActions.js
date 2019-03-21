import * as actionTypes from '../actionTypes';
import { storeCategories, storePlaylists } from './entityActions';
import { normalize, schema } from 'normalizr';
import API from '../api';

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


const fetchCategoryInfo = async (categoryId, token) => {
    try {
        const response = await API.getCategoryInfo(token, categoryId);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
}

const fetchCategoriesPlaylists = async (categoryId, token) => {
    try {
        const response = await API.getCategoryPlaylists(token, categoryId);
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
            fetchCategoryInfo(categoryId, token),
            fetchCategoriesPlaylists(categoryId, token)
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
