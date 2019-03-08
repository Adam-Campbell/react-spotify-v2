import * as actionTypes from '../actionTypes';

const defaultState = {
    newReleases: [],
    featuredPlaylists: [],
    categories: [],
    isFetching: false
};

const highlights = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_HIGHLIGHTS_REQUEST:
            return {
                ...state,
                isFetching: true
            };

        case actionTypes.FETCH_HIGHLIGHTS_FAILED:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_HIGHLIGHTS_ABORT:
            return {
                ...state,
                isFetching: false
            };

        case actionTypes.FETCH_HIGHLIGHTS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                fullHighlightsFetched: true,
                lastFetchedAt: action.payload.timestamp
            };

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