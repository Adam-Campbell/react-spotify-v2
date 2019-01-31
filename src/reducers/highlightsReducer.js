import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {
    newReleases: [],
    featuredPlaylists: [],
    categories: []
};

const highlights = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_NEW_RELEASES:
            return {
                ...state,
                newReleases: [ ...action.payload.albumIds ]
            };

        case actionTypes.STORE_FEATURED_PLAYLISTS:
            return {
                ...state,
                featuredPlaylists: [ ...action.payload.playlistIds ]
            };

        case actionTypes.STORE_CATEGORIES:
            return {
                ...state,
                categories: [ ...action.payload.categoryIds ]
            };

        default:
            return state;
    }
}

export default highlights;