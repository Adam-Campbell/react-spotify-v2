import * as actionTypes from '../actionTypes';
import { storePlaylists, storeTracks, storeAlbums, storeArtists } from './entityActions';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { cloneDeep } from 'lodash';

const fetchPlaylistRequest = (playlistId, loadingRequired) => ({
    type: actionTypes.FETCH_PLAYLIST_REQUEST,
    payload: {
        playlistId,
        loadingRequired
    }
});

const fetchPlaylistSuccess = (playlistId, timestamp) => ({
    type: actionTypes.FETCH_PLAYLIST_SUCCESS,
    payload: {
        playlistId,
        timestamp
    }
});

const fetchPlaylistFailed = (error, playlistId) => ({
    type: actionTypes.FETCH_PLAYLIST_FAILED,
    payload: {
        playlistId,
        error
    }
});

const fetchPlaylistAbort = (playlistId) => ({
    type: actionTypes.FETCH_PLAYLIST_ABORT,
    payload: {
        playlistId
    }
});

const storeUserFollowingPlaylist = (isFollowing, playlistId) => ({
    type: actionTypes.STORE_USER_FOLLOWING_PLAYLIST,
    payload: {
        isFollowing,
        playlistId
    }
});

export const storePlaylistTrackIds = (playlistTrackIds, ownerId) => ({
    type: actionTypes.STORE_PLAYLIST_TRACK_IDS,
    payload: {
        playlistTrackIds,
        ownerId
    }
});

const checkIfFollowing = (token, playlistId, currentUserId) => async (dispatch) => {
    console.log('checkIfFollowing was called');
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${currentUserId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data[0];
    } catch (err) {
        throw new Error(err);
    }
}


/**
 * This function makes the initial request for the playlist object and the first 100 tracks, and then makes
 * as many additional requests as needed in order to retrieve all of the playlists tracks. It waits for the 
 * requests to finish with Promise.all, although the requests themselves are happening in parallel, and it 
 * then returns the result.
 * @param {*} token 
 * @param {*} playlistId 
 * @param {*} market 
 */
const makePlaylistDataRequests = async (token, playlistId, market) => {
    console.log('makePlaylistDataRequests was called');
    const promiseArray = [];
    let escapeHatch = 1;
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}?market=${market}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        promiseArray.push(response);
        // set a limit so we don't make an insane amount of requests.
        const totalTracks = Math.min(response.data.tracks.total, 2500);
        // return early if there aren't any additional tracks to fetch. 
        if (totalTracks <= 100) {
            return promiseArray;
        }
        let offset = 100;
        while (offset < totalTracks && escapeHatch < 50) {
            const response = axios.get(
                `https://api.spotify.com/v1/playlists/${playlistId}/tracks?market=${market}&limit=100&offset=${offset}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    } 
            });
            promiseArray.push(response);
            offset += 100;
            escapeHatch++;
        }
        return Promise.all(promiseArray);
    } catch (err) {
        throw new Error(err);
    }
}

const formatData = (resolvedPromiseArr, playlistId) => {
    const artistSchema = new schema.Entity('artists');
    const albumSchema = new schema.Entity('albums', { artists: [artistSchema] });
    const trackSchema = new schema.Entity('tracks', { artists: [artistSchema], album: albumSchema });
    const playlistSchema = new schema.Entity(
        'playlists', 
        {
            tracks: [trackSchema] 
        },
        {
            processStrategy: (value, parent, key) => {
                const cloned = cloneDeep(value);
                cloned.tracks = cloned.tracks.items.map(item => item.track);
                return cloned;
            }
        }
    );
    const [ isFollowing, [ playlistInfoResponse, ...additionalTrackResponses ] ] = resolvedPromiseArr;
    const normalizedPlaylistData = normalize(playlistInfoResponse.data, playlistSchema);

    // normalize the additional tracks requests
    const normalizedTrackData = additionalTrackResponses.reduce((acc, req) => {
        const formattedData = req.data.items.map(item => item.track);
        const norm = normalize(formattedData, [trackSchema]);
        return {
            trackIds: [...acc.trackIds, ...norm.result],
            tracks: { ...acc.tracks, ...norm.entities.tracks },
            artists: { ...acc.artists, ...norm.entities.artists },
            albums: { ...acc.albums, ...norm.entities.albums }
        }
    }, {
        trackIds: [],
        artists: {},
        albums: {},
        tracks: {}
    });
    const playlistEntity = normalizedPlaylistData.entities.playlists[playlistId];
    const playlistTrackIds = [ ...playlistEntity.tracks, ...normalizedTrackData.trackIds ];
    delete playlistEntity.tracks;
    return {
        playlistEntity,
        playlistTrackIds,
        isFollowing,
        trackEntities: {
            ...normalizedPlaylistData.entities.tracks,
            ...normalizedTrackData.tracks
        },
        albumEntities: {
            ...normalizedPlaylistData.entities.albums,
            ...normalizedTrackData.albums
        },
        artistEntities: {
            ...normalizedPlaylistData.entities.artists,
            ...normalizedTrackData.artists
        }
    };
};


export const fetchPlaylist = (playlistId, isPrefetched=false) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const market = getState().user.country;
    const currentUserId = getState().user.id;
    const playlistFetchedAt = getState().playlists.timestamps[playlistId];
    if (playlistFetchedAt && Date.now() - playlistFetchedAt <= 3600000) {
        return dispatch(fetchPlaylistAbort(playlistId));
    }
    dispatch(fetchPlaylistRequest(playlistId, !isPrefetched));
    try {
        const results = await Promise.all([
            dispatch(checkIfFollowing(token, playlistId, currentUserId)),
            makePlaylistDataRequests(token, playlistId, market)
        ]);
        const {
            playlistEntity, 
            playlistTrackIds,
            isFollowing,
            trackEntities,
            albumEntities,
            artistEntities
        } = formatData(results, playlistId);
        dispatch(storePlaylists({ [playlistId]: playlistEntity }));
        dispatch(storeUserFollowingPlaylist(isFollowing, playlistId));
        dispatch(storePlaylistTrackIds(playlistTrackIds, playlistId));
        dispatch(storeTracks(trackEntities));
        dispatch(storeAlbums(albumEntities));
        dispatch(storeArtists(artistEntities));
        dispatch(fetchPlaylistSuccess(playlistId, Date.now()));
    } catch (err) {
        dispatch(fetchPlaylistFailed(err, playlistId));
    }
}