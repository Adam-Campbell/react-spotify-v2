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
    topArtistIds: [],
    recentTrackIds: [],
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