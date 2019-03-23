import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_ARTIST_ALBUM_IDS:
            return {
                ...state,
                [action.payload.ownerId]: action.payload.albumIds
            };

        default:
            return state;
    }
};

export default reducer;