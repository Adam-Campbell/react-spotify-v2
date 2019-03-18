import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const artistEntities = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_USERS_TOP_ARTISTS:
            return addOrMerge(state, action.payload.artistObjects);
            
        case actionTypes.STORE_USERS_RECENT_TRACKS:
            return addOrMerge(state, action.payload.artistObjects);

        case actionTypes.STORE_ARTISTS_PROFILE:
            return addOrMerge(state, action.payload.artistProfileObject, action.payload.artistId);

        case actionTypes.STORE_ARTISTS_TOP_TRACKS:
            return addOrMerge(state, action.payload.artistObjects);
            
        case actionTypes.STORE_ARTISTS_RELATED_ARTISTS:
            return addOrMerge(state, action.payload.relatedArtistObjects);

        case actionTypes.STORE_ARTISTS_ALBUMS:
            return addOrMerge(state, action.payload.artistObjects);

        case actionTypes.STORE_ALBUM:
            return addOrMerge(state, action.payload.artistObjects);

        case actionTypes.STORE_PLAYLIST:
            return addOrMerge(state, action.payload.artistObjects);

        case actionTypes.STORE_NEW_RELEASES:
            return addOrMerge(state, action.payload.artistObjects);

        case actionTypes.STORE_USERS_FOLLOWED_ARTISTS:
            return addOrMerge(state, action.payload.artistObjects);

        default: 
            return state;
    }
}

export default artistEntities;


// const artistsEntities = (state=defaultState, action) => {
//     switch (action.type) {

//         case actionTypes.STORE_USERS_TOP_ARTISTS:
//             return {
//                 ...state, 
//                 ...action.payload.artistObjects
//             };

//         case actionTypes.STORE_USERS_RECENT_TRACKS:
//             return {
//                 ...state,
//                 ...action.payload.artistObjects
//             };

//         case actionTypes.STORE_ARTISTS_PROFILE:
//             return {
//                 ...state,
//                 [action.payload.artistId]: action.payload.artistProfileObject
//             };

//         case actionTypes.STORE_ARTISTS_TOP_TRACKS:
//             return {
//                 ...state,
//                 ...action.payload.artistObjects
//             };

//         case actionTypes.STORE_ARTISTS_RELATED_ARTISTS:
//             return {
//                 ...state,
//                 ...action.payload.relatedArtistObjects
//             };

//         case actionTypes.STORE_ARTISTS_ALBUMS:
//             return {
//                 ...state,
//                 ...action.payload.artistObjects
//             };

//         case actionTypes.STORE_ALBUM:
//             return {
//                 ...state,
//                 ...action.payload.artistObjects
//             };

//         case actionTypes.STORE_PLAYLIST:
//             return {
//                 ...state,
//                 ...action.payload.artistObjects
//             };

//         case actionTypes.STORE_NEW_RELEASES:
//             return {
//                 ...state,
//                 ...action.payload.artistObjects
//             };

//         case actionTypes.STORE_USERS_FOLLOWED_ARTISTS:
//             return {
//                 ...state,
//                 ...action.payload.artistObjects
//             };

//         default: 
//             return state;
//     }
// }