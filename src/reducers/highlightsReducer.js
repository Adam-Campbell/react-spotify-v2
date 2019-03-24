import * as actionTypes from '../actionTypes';

const defaultState = {
    newReleases: [],
    featuredPlaylists: [],
    categories: []
};

const highlights = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_HIGHLIGHTS_SUCCESS:
            return {
                ...state,
                fullHighlightsFetched: true,
                lastFetchedAt: action.payload.timestamp
            };
        
        case actionTypes.STORE_HIGHLIGHTS:
            return {
                ...state,
                newReleases: action.payload.newReleaseIds,
                featuredPlaylists: action.payload.featuredPlaylistIds,
                categories: action.payload.categoryIds,
            };

        default:
            return state;
    }
}

export default highlights;