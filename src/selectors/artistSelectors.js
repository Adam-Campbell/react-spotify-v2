import { createSelector } from 'reselect';
import { getAllAlbums } from './albumSelectors';

export const getAllArtists = (state) => state.artists.entities;
export const getArtist = (state, artistId) => state.artists.entities[artistId];
export const getArtistAlbumIds = (state, artistId) => state.artists.albumIds[artistId];
export const getArtistRelatedArtistIds = (state, artistId) => state.artists.relatedArtistIds[artistId];
export const getArtistTopTrackIds = (state, artistId) => state.artists.topTrackIds[artistId];
export const getArtistTimestamp = (state, artistId) => state.artists.timestamps[artistId];

export const getSortedArtistAlbumIds = createSelector(
    [getAllAlbums, getArtistAlbumIds],
    (allAlbums, albumIds) => albumIds.reduce((prev, id) =>{
        return allAlbums[id].album_type === 'single' ? ({
            albumIds: prev.albumIds,
            singleIds: [...prev.singleIds, id]
        }) : ({
            albumIds: [...prev.albumIds, id],
            singleIds: prev.singleIds
        })
    }, {
        albumIds: [],
        singleIds: []
    })
);
