import * as actionTypes from '../../actionTypes';

const defaultState = {};

const artistsTopTracks = (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.STORE_ARTISTS_TOP_TRACKS:
            return {
                ...state,
                [action.payload.artistId]: action.payload.trackIds
            };

        default:
            return state;
    }
};

export default artistsTopTracks;