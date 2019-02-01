import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const categories = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_CATEGORIES:
            return addOrMerge(state, action.payload.categoryObjects);

        case actionTypes.STORE_CATEGORIES_PLAYLISTS:
            return addOrMerge(state, { playlistIds: action.payload.playlistIds }, action.payload.categoryId);

        default: 
            return state;

    }
}

export default categories;