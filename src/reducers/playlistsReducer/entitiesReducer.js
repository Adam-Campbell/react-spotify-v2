import * as actionTypes from '../../actionTypes';
import { addOrMerge } from '../../utils';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_PLAYLISTS:
            return addOrMerge(state, action.payload.playlistEntities);

        case actionTypes.UPDATE_PLAYLIST_NAME_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: {
                    ...state[action.payload.playlistId],
                    name: action.payload.newPlaylistName
                }
            };

        case actionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: {
                    ...state[action.payload.playlistId],
                    images: [{ height: null, width: null, url: action.payload.imageURI }]
                }
            };

        case actionTypes.CREATE_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: {
                    ...action.payload.playlistObject
                }
            };

        default:
            return state;
    }
};

export default reducer;
