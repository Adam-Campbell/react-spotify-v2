import * as actionTypes from '../actionTypes';
import { storeArtists, storeAlbums, storePlaylists, storeTracks } from './entityActions';
import { handleNormalize, entryPoints } from '../utils';
import API from '../api';

const fetchUserRequest = () => ({
    type: actionTypes.FETCH_USER_REQUEST
});

const fetchUserSuccess = () => ({
    type: actionTypes.FETCH_USER_SUCCESS
});

const fetchUserFailed = (error) => ({
    type: actionTypes.FETCH_USER_FAILED,
    payload: {
        error
    }
});

const storeUsersProfile = (usersProfile) => ({
    type: actionTypes.STORE_USERS_PROFILE,
    payload: {
        usersProfile
    }
});

const fetchUsersProfile = async (token) => {
    try {
        const response = await API.getUserProfile(token);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const fetchUsersTopArtists = async (token) => {
    try {
        const response = await API.getUserTopArtists(token);
        const artistIds = response.data.items.map(artist => artist.id);
        const artistObjects = response.data.items.reduce((collection, artist) => {
            return {
                ...collection,
                [artist.id]: { ...artist }
            };
        }, {});
        return { artistObjects, artistIds };
    } catch (err) {
        throw new Error(err);
    }
};

const fetchUsersRecentTracks = async (token) => {
    try {
        const response = await API.getUserRecentTracks(token);
        const strippedData = response.data.items.map(item => item.track);
        return handleNormalize(strippedData, entryPoints.tracks);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const fetchUsersPlaylists = async (token) => {
    try {
        const response = await API.getUserPlaylists(token);
        return handleNormalize(response.data.items, entryPoints.playlistStripTracks);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
}

const fetchUsersFollowedArtists = async (token) => {
    try {
        const response = await API.getUserFollowedArtists(token);
        return handleNormalize(response.data.artists.items, entryPoints.artists);
    } catch (err) {
        console.log(err);
        throw new Error(err);
    }
};

const destructureData = (resolvedPromiseArr) => {
    const [
        userProfileInfo,
        {
            artistObjects: topArtist_artistEntities,
            artistIds: topArtistIds
        },
        {
            entities: {
                tracks: recentTrack_trackEntities,
                artists: recentTrack_artistEntities,
                albums: recentTrack_albumEntities,
            },
            result: recentTrackIds
        },
        {
            entities: {
                playlists: playlistEntities
            },
            result: playlistIds
        },
        {
            entities: {
                artists: followedArtist_artistEntities
            },
            result: followedArtistIds
        }
    ] = resolvedPromiseArr;
    return {
        userProfile: {
            ...userProfileInfo,
            topArtistIds,
            recentTrackIds,
            playlistIds,
            followedArtistIds 
        },
        artistEntities: {
            ...recentTrack_artistEntities,
            ...followedArtist_artistEntities,
            ...topArtist_artistEntities,
        },
        albumEntities: recentTrack_albumEntities,
        trackEntities: recentTrack_trackEntities,
        playlistEntities
    }
};

export const fetchUser = () => async (dispatch, getState) => {
    dispatch(fetchUserRequest())
    const token = getState().accessToken.token;

    try {
        const results = await Promise.all([
            fetchUsersProfile(token),
            fetchUsersTopArtists(token),
            fetchUsersRecentTracks(token),
            fetchUsersPlaylists(token),
            fetchUsersFollowedArtists(token)
        ]);
        const {
            userProfile,
            artistEntities,
            albumEntities,
            playlistEntities,
            trackEntities
        } = destructureData(results);
        dispatch(storeUsersProfile(userProfile));
        dispatch(storeArtists(artistEntities));
        dispatch(storeAlbums(albumEntities));
        dispatch(storePlaylists(playlistEntities));
        dispatch(storeTracks(trackEntities));
        dispatch(fetchUserSuccess());
    } catch (err) {
        dispatch(fetchUserFailed(err));
    }
}