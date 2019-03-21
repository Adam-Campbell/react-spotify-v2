import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
    
        case actionTypes.STORE_ALBUM_TRACK_IDS:
            return {
                ...state,
                [action.payload.ownerId]: action.payload.albumTrackIds
            };
    
        default:
            return state;
    }
};

export default reducer;