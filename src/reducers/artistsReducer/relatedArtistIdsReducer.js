import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_ARTIST_RELATED_ARTIST_IDS:
            return {
                ...state,
                [action.payload.ownerId]: action.payload.relatedArtistIds
            };

        default:
            return state;
    }
};

export default reducer;