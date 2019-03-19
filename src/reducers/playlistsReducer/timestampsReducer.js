import * as actionTypes from '../../actionTypes';

const defaultState = {};

const timestamps = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: action.payload.timestamp
            }

        default:
            return state;
    }
};

export default timestamps;
