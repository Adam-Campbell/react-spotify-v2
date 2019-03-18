import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils'

const defaultState = {};

const albumFetchedAt = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ALBUM_SUCCESS:
            return {
                ...state,
                [action.payload.albumId]: action.payload.timestamp
            };

        default:
            return state;
    }
};

export default albumFetchedAt;