import * as actionTypes from '../actionTypes';

const defaultState = {
    birthdate: '',
    country: '',
    display_name: '',
    email: '',
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
    playlistIds: [],
    followedArtistIds: [],
    fullProfileFetched: false
};

const user = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_USER_SUCCESS:
            return {
                ...state,
                fullProfileFetched: true
            };

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
            };

        case actionTypes.STORE_USERS_FOLLOWED_ARTISTS:
            return {
                ...state,
                followedArtistIds: [ ...action.payload.artistIds ]
            };

        case actionTypes.FOLLOW_ARTIST_SUCCESS: 
            return {
                ...state,
                followedArtistIds: [ ...state.followedArtistIds, action.payload.artistId ]
            };

        case actionTypes.UNFOLLOW_ARTIST_SUCCESS:
            return {
                ...state,
                followedArtistIds: state.followedArtistIds.filter(id =>  id !== action.payload.artistId)
            };

        case actionTypes.CREATE_PLAYLIST_SUCCESS:
            return {
                ...state,
                playlistIds: [ action.payload.playlistId,  ...state.playlistIds, ]
            }

        default:
            return state;
    }
}

export default user;