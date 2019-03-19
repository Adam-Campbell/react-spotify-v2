import * as actionTypes from '../../actionTypes';

const defaultState = {};

const trackIds = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_PLAYLIST:
            return {
                ...state,
                [action.payload.playlistId]: action.payload.playlistTrackIds
            };

        case actionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: state[action.payload.playlistId] ?
                    [
                        ...state[action.payload.playlistId],
                        action.payload.trackId
                    ] :
                    [
                      action.payload.trackId  
                    ]
            };

        case actionTypes.REMOVE_TRACK_FROM_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: state[action.payload.playlistId] ?
                    state[action.payload.playlistId].filter(id => id !== action.payload.trackId) :
                    []
            };

        default:
            return state;
    }
};

export default trackIds;
