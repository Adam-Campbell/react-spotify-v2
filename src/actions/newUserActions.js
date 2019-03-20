import * as actionTypes from '../actionTypes';
import { storeArtists, storeAlbums, storePlaylists, storeTracks } from './entityActions';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { cloneDeep } from 'lodash';

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

const artistSchema = new schema.Entity('artists');
const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
const trackSchema = new schema.Entity('tracks', { artists: [artistSchema], album: albumSchema });
const playlistSchema = new schema.Entity('playlists', {}, {
    processStrategy: (value, parent, key) => {
        const cloned = cloneDeep(value);
        delete cloned.tracks;
        return cloned;
    }
});


const fetchUsersProfile = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const fetchUsersTopArtists = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
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

const fetchUsersRecentTracks = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const strippedData = response.data.items.map(item => item.track);
        return normalize(strippedData, [trackSchema]);
    } catch (err) {
        throw new Error(err);
    }
};

const fetchUsersPlaylists = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/playlists', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return normalize(response.data.items, [playlistSchema]);
    } catch (err) {
        throw new Error(err);
    }
}

const fetchUsersFollowedArtists = (token) => async (dispatch) => {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return normalize(response.data.artists.items, [artistSchema]);
    } catch (err) {
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
            topArtistsIds: topArtistIds,
            recentTracksIds: recentTrackIds,
            playlistIds,
            followedArtistIds 
        },
        artistEntities: {
            ...topArtist_artistEntities,
            ...recentTrack_artistEntities,
            ...followedArtist_artistEntities
        },
        albumEntities: recentTrack_albumEntities,
        trackEntities: recentTrack_trackEntities,
        playlistEntities
    }
};

export const newFetchUser = () => async (dispatch, getState) => {
    dispatch(fetchUserRequest())
    const token = getState().accessToken.token;

    try {
        const results = await Promise.all([
            dispatch(fetchUsersProfile(token)),
            dispatch(fetchUsersTopArtists(token)),
            dispatch(fetchUsersRecentTracks(token)),
            dispatch(fetchUsersPlaylists(token)),
            dispatch(fetchUsersFollowedArtists(token))
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