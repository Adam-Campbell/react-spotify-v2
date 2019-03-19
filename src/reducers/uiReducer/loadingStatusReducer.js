import * as actionTypes from '../../actionTypes';

const defaultState = {
    artistProfile: false,
    userProfile: false,
    highlightsView: false,
    categoryView: false,
    albumView: false,
    playlistView: false
}
const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ARTIST_REQUEST:
            return {
                ...state,
                artistProfile: action.payload.loadingRequired
            };
        
        case actionTypes.FETCH_ARTIST_SUCCESS:
            return {
                ...state,
                artistProfile: false
            };

        case actionTypes.FETCH_ARTIST_FAILED:
            return {
                ...state,
                artistProfile: false
            };

        case actionTypes.FETCH_ARTIST_ABORT:
            return {
                ...state,
                artistProfile: false
            };

        case actionTypes.FETCH_ALBUM_REQUEST:
            return {
                ...state,
                albumView: action.payload.loadingRequired
            };
        
        case actionTypes.FETCH_ALBUM_SUCCESS:
            return {
                ...state,
                albumView: false
            };

        case actionTypes.FETCH_ALBUM_FAILED:
            return {
                ...state,
                albumView: false
            };

        case actionTypes.FETCH_ALBUM_ABORT:
            return {
                ...state,
                albumView: false
            };

        case actionTypes.FETCH_CATEGORY_REQUEST:
            return {
                ...state,
                categoryView: action.payload.loadingRequired
            };
        
        case actionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryView: false
            };

        case actionTypes.FETCH_CATEGORY_FAILED:
            return {
                ...state,
                categoryView: false
            };

        case actionTypes.FETCH_CATEGORY_ABORT:
            return {
                ...state,
                categoryView: false
            };

        case actionTypes.FETCH_HIGHLIGHTS_REQUEST:
            return {
                ...state,
                highlightsView: true
            };
        
        case actionTypes.FETCH_HIGHLIGHTS_SUCCESS:
            return {
                ...state,
                highlightsView: false
            };

        case actionTypes.FETCH_HIGHLIGHTS_FAILED:
            return {
                ...state,
                highlightsView: false
            };

        case actionTypes.FETCH_HIGHLIGHTS_ABORT:
            return {
                ...state,
                highlightsView: false
            };

        case actionTypes.FETCH_PLAYLIST_REQUEST:
            return {
                ...state,
                playlistView: action.payload.loadingRequired
            };
        
        case actionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistView: false
            };

        case actionTypes.FETCH_PLAYLIST_FAILED:
            return {
                ...state,
                playlistView: false
            };

        case actionTypes.FETCH_PLAYLIST_ABORT:
            return {
                ...state,
                playlistView: false
            };

        case actionTypes.FETCH_USER_REQUEST:
            return {
                ...state,
                userProfile: true
            };
        
        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                userProfile: false
            };

        case actionTypes.FETCH_USER_FAILED:
            return {
                ...state,
                userProfile: false
            };

        case actionTypes.FETCH_USER_ABORT:
            return {
                ...state,
                userProfile: false
            };

        default:
            return state;
    }
}

export default reducer;
