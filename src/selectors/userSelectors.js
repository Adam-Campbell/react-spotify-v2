import { createSelector } from 'reselect';
import { getAllPlaylists } from './playlistSelectors';

export const getUserPlaylistIds = (state) => state.user.playlistIds;
export const getUserRecentTrackIds = (state) => state.user.recentTrackIds;
export const getUserTopArtistIds = (state) => state.user.topArtistIds;

export const getUserPlaylists = createSelector(
    [getUserPlaylistIds, getAllPlaylists],
    (playlistIds, playlistObjects) => playlistIds.map(id => playlistObjects[id])
);
