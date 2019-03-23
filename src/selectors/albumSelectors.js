export const getAllAlbums = (state) => state.albums.entities;
export const getAlbum = (state, albumId) => state.albums.entities[albumId];
export const getAlbumTrackIds = (state, albumId) => state.albums.trackIds[albumId];
export const getAlbumTimestamp = (state, albumId) => state.albums.timestamps[albumId];

