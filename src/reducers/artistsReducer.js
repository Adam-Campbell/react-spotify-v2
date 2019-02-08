import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {
    artistData: {},
    isFetching: false
};

const artists = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ARTIST_REQUEST:
            return {
                ...state,
                isFetching: true
            };
        
        case actionTypes.FETCH_ARTIST_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_ARTIST_ABORT:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_ARTIST_SUCCESS:
            return {
                isFetching: false,
                artistData: {
                    ...state.artistData,
                    [action.payload.artistId]: {
                        ...state.artistData[action.payload.artistId],
                        fullProfileFetched: true,
                        lastFetchedAt: action.payload.timestamp
                    }
                }
            };

        case actionTypes.STORE_USERS_TOP_ARTISTS:
            return {
                ...state,
                artistData: addOrMerge(state.artistData, action.payload.artistObjects)
            };

        case actionTypes.STORE_USERS_RECENT_TRACKS:
            return {
                ...state,
                artistData: addOrMerge(state.artistData, action.payload.artistObjects)
            };

        case actionTypes.STORE_ARTISTS_PROFILE:
            return {
                ...state,
                artistData: addOrMerge(state.artistData, action.payload.artistProfileObject, action.payload.artistId)
            };

        case actionTypes.STORE_ARTISTS_TOP_TRACKS:
            return {
                ...state,
                artistData: addOrMerge( 
                    addOrMerge(state.artistData, { topTrackIds: action.payload.trackIds }, action.payload.artistId),
                    action.payload.artistObjects
                )
            };
            
        case actionTypes.STORE_ARTISTS_RELATED_ARTISTS:
            return {
                ...state,
                artistData: addOrMerge(
                    addOrMerge(state.artistData, { relatedArtistIds: action.payload.relatedArtistIds }, action.payload.artistId),
                    action.payload.relatedArtistObjects
                )
            };

        case actionTypes.STORE_ARTISTS_ALBUMS:
            return {
                ...state,
                artistData: addOrMerge(
                    addOrMerge(state.artistData, { albumIds: action.payload.albumIds }, action.payload.artistId),
                    action.payload.artistObjects
                )
            }

        case actionTypes.STORE_ALBUM:
            return {
                ...state,
                artistData: addOrMerge(state.artistData, action.payload.artistObjects)
            };

        case actionTypes.STORE_PLAYLIST:
            return {
                ...state,
                artistData: addOrMerge(state.artistData, action.payload.artistObjects)
            };

        case actionTypes.STORE_NEW_RELEASES:
            return {
                ...state,
                artistData: addOrMerge(state.artistData, action.payload.artistObjects)
            };

        default: 
            return state;
    }
}

export default artists;