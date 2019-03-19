import * as actionTypes from '../actionTypes';

const defaultState = {
    userProfile: {
        isLoading: false
    },
    artistProfile: {
        isLoading: false
    },
    highlightsView: {
        isLoading: false
    },
    categoryView: {
        isLoading: false
    },
    albumView: {
        isLoading: false
    },
    playlistView: {
        isLoading: false
    }
};

const uiStatus = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ARTIST_REQUEST:
            return {
                ...state,
                artistProfile: {
                    ...state.artistProfile,
                    isLoading: true
                }
            };

        case actionTypes.FETCH_ARTIST_SUCCESS:
            return {
                ...state,
                artistProfile: {
                    ...state.artistProfile,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_ARTIST_FAILED:
            return {
                ...state,
                artistProfile: {
                    ...state.artistProfile,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_ARTIST_ABORT:
            return {
                ...state,
                artistProfile: {
                    ...state.artistProfile,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_ALBUM_REQUEST:
            return {
                ...state,
                albumView: {
                    ...state.albumView,
                    isLoading: true
                }
            };

        case actionTypes.FETCH_ALBUM_SUCCESS:
            return {
                ...state,
                albumView: {
                    ...state.albumView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_ALBUM_FAILED:
            return {
                ...state,
                albumView: {
                    ...state.albumView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_ALBUM_ABORT:
            return {
                ...state,
                albumView: {
                    ...state.albumView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_CATEGORY_REQUEST:
            return {
                ...state,
                categoryView: {
                    ...state.categoryView,
                    isLoading: true
                }
            };

        case actionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryView: {
                    ...state.categoryView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_CATEGORY_FAILED:
            return {
                ...state,
                categoryView: {
                    ...state.categoryView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_CATEGORY_ABORT:
            return {
                ...state,
                categoryView: {
                    ...state.categoryView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_HIGHLIGHTS_REQUEST:
            return {
                ...state,
                highlightsView: {
                    ...state.highlightsView,
                    isLoading: true
                }
            };

        case actionTypes.FETCH_HIGHLIGHTS_SUCCESS:
            return {
                ...state,
                highlightsView: {
                    ...state.highlightsView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_HIGHLIGHTS_FAILED:
            return {
                ...state,
                highlightsView: {
                    ...state.highlightsView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_HIGHLIGHTS_ABORT:
            return {
                ...state,
                highlightsView: {
                    ...state.highlightsView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_PLAYLIST_REQUEST:
            return {
                ...state,
                playlistView: {
                    ...state.playlistView,
                    isLoading: true
                }
            };

        case actionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistView: {
                    ...state.playlistView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_PLAYLIST_FAILED:
            return {
                ...state,
                playlistView: {
                    ...state.playlistView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_PLAYLIST_ABORT:
            return {
                ...state,
                playlistView: {
                    ...state.playlistView,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_USER_REQUEST:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    isLoading: true
                }
            };

        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    isLoading: false
                }
            };

        case actionTypes.FETCH_USER_FAILED:
            return {
                ...state,
                userProfile: {
                    ...state.userProfile,
                    isLoading: false
                }
            };

        default:
            return state;
    }
}

export default uiStatus;