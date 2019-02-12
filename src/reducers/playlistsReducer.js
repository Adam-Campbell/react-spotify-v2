import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {
    playlistData: {},
    isFetching: false
};

const playlists = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_PLAYLIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.FETCH_PLAYLIST_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_PLAYLIST_ABORT:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                isFetching: false,
                playlistData: {
                    ...state.playlistData,
                    [action.payload.playlistId]: {
                        ...state.playlistData[action.payload.playlistId],
                        fullPlaylistFetched: true,
                        lastFetchedAt: action.payload.timestamp
                    }
                }
            };

        case actionTypes.STORE_USERS_PLAYLISTS:
            return {
                ...state,
                playlistData: addOrMerge(state.playlistData, action.payload.playlistObjects)
            };
            
        case actionTypes.STORE_PLAYLIST:
            return {
                ...state,
                playlistData: addOrMerge(state.playlistData, action.payload.playlistObject)
            };

        case actionTypes.STORE_FEATURED_PLAYLISTS:
            return {
                ...state,
                playlistData: addOrMerge(state.playlistData, action.payload.playlistObjects)
            };

        case actionTypes.STORE_CATEGORIES_PLAYLISTS:
            return {
                ...state,
                playlistData: addOrMerge(state.playlistData, action.payload.playlistObjects)
            };

        case actionTypes.STORE_PLAYLIST_FOLLOW_STATUS:
            return {
                ...state,
                playlistData: addOrMerge(
                    state.playlistData, 
                    { isFollowing: action.payload.isFollowing }, 
                    action.payload.playlistId
                )
            };

        case actionTypes.FOLLOW_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistData: addOrMerge(
                    state.playlistData, 
                    { isFollowing: true }, 
                    action.payload.playlistId
                )
            };

        case actionTypes.UNFOLLOW_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistData: addOrMerge(
                    state.playlistData, 
                    { isFollowing: false }, 
                    action.payload.playlistId
                )
            };

        

        default:
            return state;
    }
}

export default playlists;