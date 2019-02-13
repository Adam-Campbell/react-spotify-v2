import * as actionTypes from '../actionTypes';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { getUsersMarket } from './userActions';
import { cloneDeep } from 'lodash';

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

/*

Fetching all additional tracks

Initial playlist fetch will get the playlist object, and the first 100 tracks objects. 
Once normalized this will give me the following entities:

playlists
tracks
artists
albums

I will also have an ordered array of the first 100 trackIds. 

From there I can grab the total amount of tracks, and either use a while loop with a counter to keep making
requests until the end of the list is reached, or calculate ahead of time how many requests it will take and
just keep going until that many requests have been completed. However, I will also have to keep track of
my position (offset) within the track list.




Fetch all data before normalizing...

Make the initial request, and then check the total amount of tracks (don't need to normalize for this).

Create an array with the first request as the only element. 

Now use a loop to keep making requests for the tracks, moving through the list of tracks until the end 
is reached. Every new request made gets added to the array. 

Once all requests have been made the array can be returned. 

Elsewhere,  Promise.all will be used to wait for all of the promises to be fulfilled. Now we have an array where
the first element is the (not yet normalized) result of the first API call (contains the playlist object), and
every subsequent element is the result of one of the subsequent API calls, which each contain some number of 
track objects (not yet normalized however). Critically, they are all in the correct order.

Pop the first element off of the array. 

First element can be normalized, which will give us the playlist object (with its tracks property replaced with
an array of trackIds), as well as various track, artist and album entities. 

Now all of the remaning elements can be normalized with a reduce function. Each of the remaining elements when
normalized will give us an ordered array of trackIds, as well as track, album and artist entities. Set up the
reduce such that we end up with the following structure:

{
    trackIds: [],
    tracks: {},
    artists: {},
    albums: {}
}

Finally, we can take the data returned from this reduce function and combine it with the data from the first 
element (we popped it off the array before calling reduce). We will take the trackIds array and add it onto the
end of the tracks property of the playlist object. Then we will merge all of the entity dictionaries with their
counterparts from the first element. 

*/





/**
 * This function makes the initial request for the playlist object and the first 100 tracks, and then makes
 * as many additional requests as needed in order to retrieve all of the playlists tracks. It waits for the 
 * requests to finish with Promise.all, although the requests themselves are happening in parallel, and it 
 * then returns the result.
 * @param {*} token 
 * @param {*} playlistId 
 * @param {*} market 
 */
const fetchPlaylistData = async (token, playlistId, market) => {
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
    const allRequests = await fetchPlaylistData(token, playlistId, market);
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