import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { cloneDeep } from 'lodash';

/*

PLAYLIST FETCHING EXPLANATION
------------------------------

In order to fetch a playlist plus all of its tracks, multiple requests (potentially) have to be made.
The main endpoint for retreiving the playlist object will also retreive the first 100 tracks, any 
additional tracks have to be fetched seperately in groups of 100 (max) at a time. 

However the initial request to get the playlist object must be made first in order for us to know how many
tracks the playlist has. 

Functions:

makePlaylistDataRequests
    - Makes initial request to retreive the playlist object
    - Once the playlist object has been received, it checks how many tracks the playlist has
    - If it has more than 100, it makes the necessary requests to retreive all tracks, 100 tracks at a time
    - These requests are made concurrently for faster execution
    - Once all requests have completed, it returns all of the data gathered in the previous steps

fetchPlaylist
    - Calls the makePlaylistDataRequests function, and awaits the result
    - Once the data has been returned, processes the data: 
        - Normalizes the data seperating out all nested entities
        - Takes any additional trackIds from the subsequent API calls and appends them to the tracks
          array on the playlist object, ensuring that the original order of the tracks is preserved 

*/



const fetchPlaylistRequest = (playlistId) => ({
    type: actionTypes.FETCH_PLAYLIST_REQUEST,
    payload: {
        playlistId
    }
});

const fetchPlaylistSuccess = (playlistId) => ({
    type: actionTypes.FETCH_PLAYLIST_SUCCESS,
    payload: {
        playlistId
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

const storePlaylist = (playlistObject, playlistId, trackObjects, artistObjects, albumObjects) => ({
    type: actionTypes.STORE_PLAYLIST,
    payload: {
        playlistObject,
        playlistId, 
        trackObjects,
        artistObjects, 
        albumObjects
    }
});

const storePlaylistFollowStatus = (playlistId, isFollowing) => ({
    type: actionTypes.STORE_PLAYLIST_FOLLOW_STATUS,
    payload: {
        playlistId,
        isFollowing
    }
});

const checkIfFollowing = (token, playlistId, currentUserId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `https://api.spotify.com/v1/playlists/${playlistId}/followers/contains?ids=${currentUserId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(storePlaylistFollowStatus(
            playlistId,
            response.data[0]
        ));
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
        const result = await Promise.all([...promiseArray]);
        return result;
    } catch (err) {
        throw new Error(err);
    }
}


/**
 * This function calls fetchPlaylistData to get all of the data for this playlist. It then processes and
 * normalizes this data, and dispatches it to the store. 
 * @param {*} playlistId 
 */
export const fetchPlaylist = (playlistId) => async (dispatch, getState) => {
    const token = getState().accessToken.token;
    const market = getState().user.country;
    const playlist = getState().playlists.playlistData[playlistId];
    const currentUserId = getState().user.id;
    if (playlist && playlist.fullPlaylistFetched && Date.now() - playlist.lastFetchedAt <= 3600000) {
        return dispatch(fetchPlaylistAbort(playlistId));
    }
    try {
    dispatch(checkIfFollowing(token, playlistId, currentUserId))
    const allRequests = await makePlaylistDataRequests(token, playlistId, market);
    const playlistRequest = allRequests.shift();
    const additionalTrackRequests = allRequests;

    // normalize the playlistRequest

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
    const normalizedPlaylistData = normalize(playlistRequest.data, playlistSchema);

    // normalize the additional tracks requests
    const normalizedTrackData = additionalTrackRequests.reduce((acc, req) => {
        const formattedData = req.data.items.map(item => item.track);
        const norm = normalize(formattedData, [trackSchema]);
        
        return {
            trackIds: [...acc.trackIds, ...norm.result],
            tracks: {
                ...acc.tracks,
                ...norm.entities.tracks
            },
            artists: {
                ...acc.artists,
                ...norm.entities.artists
            },
            albums: {
                ...acc.albums,
                ...norm.entities.albums
            }
        }
    }, {
        trackIds: [],
        artists: {},
        albums: {},
        tracks: {}
    });

    // combine all of the results from normalizing the requests so that they can be dispatched to the store.
    const playlistObject = normalizedPlaylistData.entities.playlists[playlistId];
    playlistObject.tracks = [ ...playlistObject.tracks, ...normalizedTrackData.trackIds ];
    playlistObject.fullPlaylistFetched = true;
    playlistObject.lastFetchedAt = Date.now();
    const allTrackObjects = {
        ...normalizedPlaylistData.entities.tracks,
        ...normalizedTrackData.tracks
    };
    const allAlbumObjects = {
        ...normalizedPlaylistData.entities.albums,
        ...normalizedTrackData.albums
    };
    const allArtistObjects = {
        ...normalizedPlaylistData.entities.artists,
        ...normalizedTrackData.artists
    }
    
    dispatch(storePlaylist(
        playlistObject,
        playlistId,
        allTrackObjects,
        allArtistObjects,
        allAlbumObjects
    ));
    dispatch(fetchPlaylistSuccess(playlistId));
    } catch (err) {
        dispatch(fetchPlaylistFailed(err, playlistId));
    }
}