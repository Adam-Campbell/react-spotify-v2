import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const tracks = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_USERS_RECENT_TRACKS:
            return {
                ...state,
                ...action.payload.trackObjects
            }

        case actionTypes.STORE_ARTISTS_TOP_TRACKS:
            return addOrMerge(state, action.payload.trackObjects);

        case actionTypes.STORE_ALBUM:
            return addOrMerge(state, action.payload.trackObjects);

        case actionTypes.STORE_PLAYLIST:
            return addOrMerge(state, action.payload.trackObjects);

        default:
            return state;
    }
}

export default tracks;