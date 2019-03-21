import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_CATEGORY_PLAYLIST_IDS:
            return {
                ...state,
                [action.payload.ownerId]: action.payload.playlistIds
            };

        default:
            return state;
    }
};

export default reducer;