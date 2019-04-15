import axios from 'axios';

const a = axios.create({
    baseURL: 'https://api.spotify.com/v1/'
});

const get = (url, token) => {
    return a.get(url, { 
        headers: { 
            'Authorization': `Bearer ${token}` 
        } 
    });
};


// ARTIST endpoints
const getArtistProfile = (token, artistId) => get(`artists/${artistId}`, token);

const getArtistTopTracks = (token, artistId, market) => 
    get(`artists/${artistId}/top-tracks?country=${market}`, token);

const getArtistRelatedArtists = (token, artistId) => get(`artists/${artistId}/related-artists`, token);

const getArtistAlbums = (token, artistId, market) => 
    get(`artists/${artistId}/albums?album_type=album,single&limit=50&market=${market}`, token);


// ALBUM endpoints
const getAlbum = (token, albumId, market) => get(`albums/${albumId}?market=${market}`, token);


// HIGHLIGHTS endpoints
const getNewReleases = (token, market) => get(`browse/new-releases?country=${market}&limit=50`, token);

const getFeaturedPlaylists = (token, market) => 
    get(`browse/featured-playlists?country=${market}&limit=50`, token);

const getCategories = (token, market) => get(`browse/categories?country=${market}&limit=50`, token);


// CATEGORY actions

const getCategoryInfo = (token, categoryId) => get(`browse/categories/${categoryId}`, token);

const getCategoryPlaylists = (token, categoryId) => 
    get(`browse/categories/${categoryId}/playlists?limit=50`, token);



// USER actions

const getUserProfile = (token) => get('me', token);
const getUserTopArtists = (token) => get('me/top/artists', token);
const getUserRecentTracks = (token) => get('me/player/recently-played', token);
const getUserPlaylists = (token) => get('me/playlists', token);
const getUserFollowedArtists = (token) => get('me/following?type=artist', token);


// Playlist fetching actions

const getUserFollowingPlaylistStatus = (token, playlistId, currentUserId) =>
    get(`playlists/${playlistId}/followers/contains?ids=${currentUserId}`, token);

const getPlaylistInfo = (token, playlistId, market) => 
    get(`playlists/${playlistId}?market=${market}`, token);

const getPlaylistTracks = (token, playlistId, market, offset) =>
    get(`playlists/${playlistId}/tracks?market=${market}&limit=100&offset=${offset}`, token);



// Follow / unfollow actions

const followArtist = (token, artistId) => {
    return a.request('me/following?type=artist', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        data: {
            'ids': [ artistId ]
        }
    });
};

const unfollowArtist = (token, artistId) => {
    return a.delete('me/following?type=artist', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: {
            'ids': [ artistId ]
        } 
    });
};

const followPlaylist = (token, playlistId) => {
    return a.request(`playlists/${playlistId}/followers`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'PUT'
    });
};

const unfollowPlaylist = (token, playlistId) => {
    return a.delete(`playlists/${playlistId}/followers`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        } 
    });
};

// Playlist editing actions

const updatePlaylistName = (token, playlistId, newPlaylistName) => {
    return a.request(`playlists/${playlistId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        data: {
            name: newPlaylistName
        }
    });
};

const updatePlaylistImage = (token, playlistId, imageData) => {
    return a.request(`playlists/${playlistId}/images`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'image/jpeg'
        },
        method: 'PUT',
        data: imageData
    });
};

const addTrackToPlaylist = (token, playlistId, trackURI) => {
    return a.request(`playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
            uris: [ trackURI ]
        }
    });
};

const removeTrackFromPlaylist = (token, playlistId, trackURI) => {
    return a.request(`playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'DELETE',
        data: {
            tracks: [
                { uri: trackURI }
            ]
        }
    });
};

const createPlaylist = (token, currentUserId, playlistName) => {
    return a.request(`users/${currentUserId}/playlists`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        data: {
            name: playlistName
        }
    });
};


// Player actions

const selectTrackWithContext = (token, deviceId, trackURI, contextURI) => {
    return a.request(`me/player/play?device_id=${deviceId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        data: {
            context_uri: contextURI,
            offset: {
                uri: trackURI
            }
        }
    });
};

const selectTrackWithURIList = (token, deviceId, trackURI, allTrackURIs) => {
    return a.request(`me/player/play?device_id=${deviceId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        data: {
            uris: [ ...allTrackURIs ],
            offset: {
                uri: trackURI
            }
        }
    });
};

const setShuffle = (token, deviceId, shuffleValue) => {
    return a.request(`me/player/shuffle?device_id=${deviceId}&state=${shuffleValue}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT'
    });
};

const setRepeat = (token, deviceId, newRepeatValue) => {
    return a.request(`me/player/repeat?state=${newRepeatValue}&device_id=${deviceId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT'
    });
};


export default {
    getUserProfile,
    getUserTopArtists,
    getUserRecentTracks,
    getUserPlaylists,
    getUserFollowedArtists,
    getArtistProfile,
    getArtistTopTracks,
    getArtistRelatedArtists,
    getArtistAlbums,
    getAlbum,
    getNewReleases,
    getFeaturedPlaylists,
    getCategories,
    getCategoryInfo,
    getCategoryPlaylists,
    getUserFollowingPlaylistStatus,
    getPlaylistInfo,
    getPlaylistTracks,
    followArtist,
    unfollowArtist,
    followPlaylist,
    unfollowPlaylist,
    updatePlaylistName,
    updatePlaylistImage,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    createPlaylist,
    selectTrackWithContext,
    selectTrackWithURIList,
    setShuffle,
    setRepeat
};
