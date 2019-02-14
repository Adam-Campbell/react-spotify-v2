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

        // case actionTypes.FETCH_PLAYLIST_SUCCESS:
        //     return {
        //         isFetching: false,
        //         playlistData: {
        //             ...state.playlistData,
        //             [action.payload.playlistId]: {
        //                 ...state.playlistData[action.payload.playlistId],
        //                 fullPlaylistFetched: true,
        //                 lastFetchedAt: action.payload.timestamp
        //             }
        //         }
        //     };

        case actionTypes.STORE_USERS_PLAYLISTS:
            return {
                ...state,
                playlistData: addOrMerge(state.playlistData, action.payload.playlistObjects)
            };
            
        case actionTypes.STORE_PLAYLIST:
            return {
                ...state,
                playlistData: addOrMerge(state.playlistData, action.payload.playlistObject, action.payload.playlistId)
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

        case actionTypes.UPDATE_PLAYLIST_NAME_SUCCESS:
            return {
                ...state,
                playlistData: addOrMerge(
                    state.playlistData,
                    { name: action.payload.newPlaylistName },
                    action.payload.playlistId
                )
            };

        case actionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS:
            return {
                ...state,
                playlistData: addOrMerge(
                    state.playlistData,
                    { images: [{ height: null, width: null, url: action.payload.imageURI }] },
                    action.payload.playlistId
                )
            };

        case actionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistData: {
                    ...state.playlistData,
                    [action.payload.playlistId]: {
                        ...state.playlistData[action.payload.playlistId],
                        tracks: state.playlistData[action.payload.playlistId].tracks ?
                                [
                                    ...state.playlistData[action.payload.playlistId].tracks, 
                                    action.payload.trackId
                                ] :
                                [ action.payload.trackId ]
                        
                    }
                }
            }

        case actionTypes.REMOVE_TRACK_FROM_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistData: {
                    ...state.playlistData,
                    [action.payload.playlistId]: {
                        ...state.playlistData[action.payload.playlistId],
                        tracks: state.playlistData[action.payload.playlistId].tracks ?
                                state.playlistData[action.payload.playlistId].tracks.filter(id => 
                                    id !== action.payload.trackId
                                ) :
                                []
                    }
                }
            }

        default:
            return state;
    }
}

export default playlists;