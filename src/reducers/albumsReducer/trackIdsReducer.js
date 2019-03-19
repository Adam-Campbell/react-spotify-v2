import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
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

export default reducer;