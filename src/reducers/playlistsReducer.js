import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const playlists = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_USERS_PLAYLISTS:
            return addOrMerge(state, action.payload.playlistObjects);
            
        case actionTypes.STORE_PLAYLIST:
            return addOrMerge(state, action.payload.playlistObject);

        case actionTypes.STORE_FEATURED_PLAYLISTS:
            return addOrMerge(state, action.payload.playlistObjects);

        case actionTypes.STORE_CATEGORIES_PLAYLISTS:
            return addOrMerge(state, action.payload.playlistObjects);

        

        default:
            return state;
    }
}

export default playlists;