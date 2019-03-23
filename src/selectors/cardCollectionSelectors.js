import { createSelector } from 'reselect';
import { getAllArtists } from './artistSelectors';
import { getAllAlbums } from './albumSelectors';
import { getAllPlaylists } from './playlistSelectors';
import { getAllCategories } from './categorySelectors';

export const makeGetCollectionOfArtists = () => createSelector(
    [getAllArtists, (state, idsArray) => idsArray],
    (artistEntities, idsArray) => idsArray.map(id => artistEntities[id])
);


export const makeGetCollectionOfPlaylists = () => createSelector(
    [getAllPlaylists, (state, idsArray) => idsArray],
    (playlistEntities, idsArray) => idsArray.map(id => playlistEntities[id])
);

export const makeGetCollectionOfCategories = () => createSelector(
    [getAllCategories, (state, idsArray) => idsArray],
    (categoryEntities, idsArray) => idsArray.map(id => categoryEntities[id])
);

export const makeGetCollectionOfAlbums = () => createSelector(
    [
        getAllAlbums, 
        getAllArtists, 
        (state, idsArray, includeAdditional) => idsArray,
        (state, idsArray, includeAdditional) => includeAdditional
    ],
    (albumEntities, artistEntities, idsArray, includeAdditional) => idsArray.map(id => {
        const album = albumEntities[id];
        if (includeAdditional) {
            const albumArtistId = album.artists[0];
            return {
                ...album,
                additional: artistEntities[albumArtistId].name
            };
        } else {
            return album;
        }
    })
)