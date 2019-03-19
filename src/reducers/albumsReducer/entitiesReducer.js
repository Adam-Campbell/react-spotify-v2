import * as actionTypes from '../../actionTypes';
import { addOrMerge } from '../../utils'

const defaultState = {};

const entities = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_USERS_RECENT_TRACKS:
            return addOrMerge(state, action.payload.albumObjects);

        case actionTypes.STORE_ARTISTS_TOP_TRACKS:
            return addOrMerge(state, action.payload.albumObjects);

        case actionTypes.STORE_ARTISTS_ALBUMS:
            return addOrMerge(state, action.payload.albumObjects);

        case actionTypes.STORE_ALBUM:
            return addOrMerge(state, action.payload.albumObject, action.payload.albumId);

        case actionTypes.STORE_PLAYLIST:
            return addOrMerge(state, action.payload.albumObjects);

        case actionTypes.STORE_NEW_RELEASES:
            return addOrMerge(state, action.payload.albumObjects);

        default:
            return state;
    }
};

export default entities;