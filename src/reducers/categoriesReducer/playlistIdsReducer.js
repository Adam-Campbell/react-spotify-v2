import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_CATEGORIES_PLAYLISTS:
            return {
                ...state,
                [action.payload.categoryId]: action.payload.playlistIds
            };

        default:
            return state;
    }
};

export default reducer;