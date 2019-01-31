import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const artists = (state={}, action) => {
    switch (action.type) {

        case actionTypes.STORE_USERS_TOP_ARTISTS:
            return {
                ...state,
                ...action.payload.artistObjects
            };

        case actionTypes.STORE_USERS_RECENT_TRACKS:
            return {
                ...state,
                ...action.payload.artistObjects
            };

        case actionTypes.STORE_ARTISTS_PROFILE:
            return addOrMerge(state, action.payload.artistProfileObject, action.payload.artistId);

        case actionTypes.STORE_ARTISTS_TOP_TRACKS:
            return addOrMerge( 
                addOrMerge(state, { topTrackIds: action.payload.trackIds }, action.payload.artistId),
                action.payload.artistObjects
            );

        case actionTypes.STORE_ARTISTS_RELATED_ARTISTS:
            return addOrMerge(
                addOrMerge(state, { relatedArtistIds: action.payload.relatedArtistIds }, action.payload.artistId),
                action.payload.relatedArtistObjects
            );

        case actionTypes.STORE_ARTISTS_ALBUMS:
            return addOrMerge(
                addOrMerge(state, { albumIds: action.payload.albumIds }, action.payload.artistId),
                action.payload.artistObjects
            );

        case actionTypes.STORE_ALBUM:
            return addOrMerge(state, action.payload.artistObjects);

        case actionTypes.STORE_PLAYLIST:
            return addOrMerge(state, action.payload.artistObjects);

        case actionTypes.STORE_NEW_RELEASES:
            return addOrMerge(state, action.payload.artistObjects);

        default: 
            return state;
    }
}

export default artists;