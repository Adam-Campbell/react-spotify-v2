export const getAllArtists = (state) => state.artists.entities;
export const getArtist = (state, artistId) => state.artists.entities[artistId];
export const getArtistAlbumIds = (state, artistId) => state.artists.albumIds[artistId];
export const getArtistRelatedArtistIds = (state, artistId) => state.artists.relatedArtistIds[artistId];
export const getArtistTopTrackIds = (state, artistId) => state.artists.topTrackIds[artistId];
export const getArtistTimestamp = (state, artistId) => state.artists.timestamps[artistId];
