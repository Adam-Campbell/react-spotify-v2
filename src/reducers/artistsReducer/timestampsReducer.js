import * as actionTypes from '../../actionTypes';

const defaultState = {};

const timestamps = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ARTIST_SUCCESS:
            return {
                ...state,
                [action.payload.artistId]: action.payload.timestamp
            };

        default:
            return state;
    }
};

export default timestamps;