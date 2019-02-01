import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {
    categoryData: {},
    isFetching: false
};

const categories = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_CATEGORIES_PLAYLISTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.FETCH_CATEGORIES_PLAYLISTS_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_CATEGORIES_PLAYLISTS_ABORT:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_CATEGORIES_PLAYLISTS_SUCCESS:
            return {
                isFetching: false,
                categoryData: {
                    ...state.categoryData,
                    [action.payload.categoryId]: {
                        ...state.categoryData[action.payload.categoryId],
                        fullCategoryFetched: true,
                        lastFetchedAt: action.payload.timestamp
                    }
                }
            };

        case actionTypes.STORE_CATEGORIES:
            return {
                ...state,
                categoryData: addOrMerge(state.categoryData, action.payload.categoryObjects)
            };

        case actionTypes.STORE_CATEGORIES_PLAYLISTS:
            return {
                ...state,
                categoryData: addOrMerge(
                    state.categoryData, 
                    { playlistIds: action.payload.playlistIds }, 
                    action.payload.categoryId
                )
            };

        default: 
            return state;

    }
}

export default categories;