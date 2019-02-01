import * as actionTypes from '../actionTypes';

const defaultState = {
    country: '',
    displayName: '',
    external_urls: {},
    followers: {},
    href: '',
    id: '',
    images: [],
    product: '',
    type: '',
    uri: '',
    topArtistsIds: [],
    recentTracksIds: [],
    playlistIds: []
};

const user = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_USERS_PROFILE:
            return {
                ...state,
                ...action.payload.usersProfile
            };

        case actionTypes.STORE_USERS_TOP_ARTISTS:
            return {
                ...state,
                topArtistsIds: [ ...action.payload.artistIds ]
            };

        case actionTypes.STORE_USERS_RECENT_TRACKS:
            return {
                ...state,
                recentTracksIds: [ ...action.payload.trackIds ]
            };

        case actionTypes.STORE_USERS_PLAYLISTS:
            return {
                ...state,
                playlistIds: [ ...action.payload.playlistIds ]
            }

        default:
            return state;
    }
}

export default user;