import { createSelector } from 'reselect';
import { getUserProfile } from './userSelectors';

export const getAllPlaylists = (state) => state.playlists.entities;
export const getPlaylist = (state, playlistId) => state.playlists.entities[playlistId];
export const getPlaylistTrackIds = (state, playlistId) => state.playlists.trackIds[playlistId];
export const getPlaylistUserFollowingStatus = (state, playlistId) => state.playlists.userFollowing[playlistId];
export const getPlaylistTimestamp = (state, playlistId) => state.playlists.timestamps[playlistId];

export const getUserIsPlaylistOwner = createSelector(
    [getUserProfile, (state, playlistOwnerId) => playlistOwnerId],
    (userProfile, playlistOwnerId) => userProfile.id === playlistOwnerId
);
