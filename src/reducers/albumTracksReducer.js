import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils'

const defaultState = {};

const albumTracks = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_ALBUM:
            return {
                ...state,
                [action.payload.albumId]: action.payload.albumsTrackIds
            };
    
        default:
            return state;
    }
};

export default albumTracks;