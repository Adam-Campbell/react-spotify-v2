import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const categoryPlaylists = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_CATEGORIES_PLAYLISTS:
            return {
                ...state,
                [action.payload.categoryId]: action.payload.playlistIds
            };

        default:
            return state;
    }
};

export default categoryPlaylists;