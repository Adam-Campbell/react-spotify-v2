import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const playlistFetchedAt = (state=defaultState, action) => {
    switch (action.type) {

        // this action needs to be updated in order for this to work. Currently I'm just applying the timestamp
        // directly to the playlist object within the thunk, need to add the timestamp to the payload of the 
        // below action instead.
        case actionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: action.payload.timestamp
            }

        default:
            return state;
    }
};

export default playlistFetchedAt;