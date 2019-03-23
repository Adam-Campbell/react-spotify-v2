import { createSelector } from 'reselect';
import { getAllTracks } from './trackSelectors';
export const getPlayerInfo = (state) => state.player;
const getCurrentTrackId = (state) => state.player.trackId;

export const getCurrentTrackPreviewURL = createSelector(
    [getAllTracks, getCurrentTrackId],
    (allTracks, currentTrackId) => allTracks[currentTrackId] ? allTracks[currentTrackId].preview_url : ''
);
