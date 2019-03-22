import { createSelector } from 'reselect';

export const getUserProfile = (state) => state.user;
export const getUserPlaylistIds = (state) => state.user.playlistIds;
export const getUserRecentTrackIds = (state) => state.user.recentTrackIds;
export const getUserTopArtistIds = (state) => state.user.topArtistIds;
export const getUserFollowedArtistIds = (state) => state.user.followedArtistIds;

const getAllPlaylists = (state) => state.playlists.entities;

export const getUserPlaylists = createSelector(
    [getUserPlaylistIds, getAllPlaylists],
    (playlistIds, playlistObjects) => playlistIds.map(id => playlistObjects[id])
);


export const getUserFollowingArtist = createSelector(
    [getUserFollowedArtistIds, (state, artistId) => artistId],
    (followedArtistIds, artistId) => followedArtistIds.includes(artistId)
);
