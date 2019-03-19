import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ARTISTS_RELATED_ARTISTS:
            return {
                ...state,
                [action.payload.artistId]: action.payload.relatedArtistIds
            };

        default:
            return state;
    }
};

export default reducer;