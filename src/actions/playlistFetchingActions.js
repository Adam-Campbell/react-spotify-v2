import * as actionTypes from '../actionTypes';
import { storePlaylists, storeTracks, storeAlbums, storeArtists } from './entityActions';
import API from '../api';
import { handleNormalize, entryPoints } from '../utils';

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

const storePlaylistTrackIds = (playlistTrackIds, ownerId) => ({
    type: actionTypes.STORE_PLAYLIST_TRACK_IDS,
    payload: {
        playlistTrackIds,
        ownerId
    }
});

const checkIfFollowing = async (token, playlistId, currentUserId) => {
    try {
        const response = await API.getUserFollowingPlaylistStatus(token, playlistId, currentUserId);
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
    const promiseArray = [];
    try {
        const response = await API.getPlaylistInfo(token, playlistId, market);
        promiseArray.push(response);
        // set a limit so we don't make an unreasonable amount of requests.
        const totalTracks = Math.min(response.data.tracks.total, 2500);
        // return early if there aren't any additional tracks to fetch. 
        if (totalTracks <= 100) {
            return promiseArray;
        }
        let offset = 100;  
        while (offset < totalTracks) {
            const response = API.getPlaylistTracks(token, playlistId, market, offset);
            promiseArray.push(response);
            offset += 100;
        }
        return Promise.all(promiseArray);
    } catch (err) {
        throw new Error(err);
    }
}

/**
 * Takes the array of resolved promises containing the results of the various API requests, which are not yet 
 * in a normalized state. It then performs the necessary transformations on the data in order to normalize it, 
 * and groups the data by entity type before returning it.
 * @param {Array} resolvedPromiseArr - an array containing the results of the various API calls. 
 * @param {String} playlistId - the id of the playlist being fetched.
 * @returns {Object} - the rearranged data, now grouped by entity type.
*/
const formatData = (resolvedPromiseArr, playlistId) => {
    const [ isFollowing, [ playlistInfoResponse, ...additionalTrackResponses ] ] = resolvedPromiseArr;
    const normalizedPlaylistData = handleNormalize(playlistInfoResponse.data, entryPoints.complexPlaylist);

    // normalize the additional tracks requests
    const normalizedTrackData = additionalTrackResponses.reduce((acc, req) => {
        const formattedData = req.data.items.map(item => item.track);
        const norm = handleNormalize(formattedData, entryPoints.tracks);
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
            checkIfFollowing(token, playlistId, currentUserId),
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