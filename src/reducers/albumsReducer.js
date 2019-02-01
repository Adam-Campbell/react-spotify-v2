import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils'

const defaultState = {
    albumData: {},
    isFetching: false
};

const albums = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ALBUM_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.FETCH_ALBUM_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_ALBUM_ABORT:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_ALBUM_SUCCESS:
            return {
                isFetching: false,
                albumData: {
                    ...state.albumData,
                    [action.payload.albumId]: {
                        ...state.albumData[action.payload.albumId],
                        fullAlbumFetched: true,
                        lastFetchedAt: action.payload.timestamp
                    }
                }
            }

        case actionTypes.STORE_USERS_RECENT_TRACKS:
            return {
                ...state,
                albumData: {
                    ...state.albumData,
                    ...action.payload.albumObjects
                }
            };

        case actionTypes.STORE_ARTISTS_TOP_TRACKS:
            return {
                ...state,
                albumData: addOrMerge(state.albumData, action.payload.albumObjects)
            };

        case actionTypes.STORE_ARTISTS_ALBUMS:
            return {
                ...state,
                albumData: addOrMerge(state.albumData, action.payload.albumObjects)
            };

        case actionTypes.STORE_ALBUM:
            return {
                ...state,
                albumData: addOrMerge(state.albumData, action.payload.albumObject)
            };

        case actionTypes.STORE_PLAYLIST:
            return {
                ...state,
                albumData: addOrMerge(state.albumData, action.payload.albumObjects)
            };

        case actionTypes.STORE_NEW_RELEASES:
            return {
                ...state,
                albumData: addOrMerge(state.albumData, action.payload.albumObjects)
            };

        default:
            return state;
    }
}

export default albums;