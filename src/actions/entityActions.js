import * as actionTypes from '../actionTypes';

export const storeAlbums = (albumEntities) => ({
    type: actionTypes.STORE_ALBUMS,
    payload: {
        albumEntities
    }
});

export const storeArtists = (artistEntities) => ({
    type: actionTypes.STORE_ARTISTS,
    payload: {
        artistEntities
    }
});

export const storePlaylists = (playlistEntities) => ({
    type: actionTypes.STORE_PLAYLISTS,
    payload: {
        playlistEntities
    }
});

export const storeCategories = (categoryEntities) => ({
    type: actionTypes.STORE_CATEGORIES,
    payload: {
        categoryEntities
    }
});

export const storeTracks = (trackEntities) => ({
    type: actionTypes.STORE_TRACKS,
    payload: {
        trackEntities
    }
});
