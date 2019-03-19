import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_PLAYLIST_FOLLOW_STATUS:
            return {
                ...state, 
                [action.payload.playlistId]: action.payload.isFollowing
            };

        case actionTypes.FOLLOW_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: true
            };

        case actionTypes.UNFOLLOW_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: false
            };

        default: 
            return state;
    }
};

export default reducer;
