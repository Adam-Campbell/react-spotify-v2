import * as actionTypes from '../../actionTypes';

const defaultState = {};

const albumIds = (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ARTISTS_ALBUMS:
            return {
                ...state,
                [action.payload.artistId]: action.payload.albumIds
            };

        default:
            return state;
    }
};

export default albumIds;