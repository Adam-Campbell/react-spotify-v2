import * as actionTypes from '../../actionTypes';

const standardSelectTrackPlainAction = (trackId, contextURI, contextTrackIds, shuffledContextTrackIds) => ({
    type: actionTypes.STANDARD_SELECT_TRACK,
    payload: {
        trackId,
        contextURI,
        contextTrackIds,
        shuffledContextTrackIds
    }
});

/**
 * Given an array of track ids and a selected track id, rearranges the array such that the selected track
 * id is first, and the remainder of the ids are randomly ordered.
 * @param {String} selectedTrack - the id for the selected track
 * @param {Array} allTracks - an array of all of the track ids
 */
const getShuffledTrackIds = (selectedTrack, allTracks) => {
    let filtered = allTracks.filter(track => track !== selectedTrack);
    let shuffledFiltered = [ selectedTrack ];
    while (filtered.length) {
        let index = Math.floor(Math.random() * filtered.length);
        shuffledFiltered.push(filtered.splice(index, 1)[0]);
    }
    return shuffledFiltered;
}

/**
 * Given a context, retrieves the array of ids for the tracks in that context.
 * @param {String} contextURI - the URI for the context in question
 * @param {String} contextId - the Id for the context in question
 * @param {Object} state - the current state from the store
 */
const getContextTrackIds = (contextURI, contextId, state) => {
    const splitContext = contextURI.split(':');
    const contextType = splitContext[splitContext.length - 2];
    switch (contextType) {
        case 'album':
            return [ ...state.albums.albumData[contextId].tracks ];
        
        case 'playlist':
            return [ ...state.playlists.playlistData[contextId].tracks ];

        case 'artist':
            return [ ...state.artists.artistData[contextId].topTrackIds ];

        case 'user':
            return [ ...state.user.recentTracksIds ];

        default:
            return [];
    }
}

export const standardSelectTrack = ({ contextURI, contextId, trackURI, trackId }) => (dispatch, getState) => {
    const state = getState();
    const contextTrackIds = getContextTrackIds(contextURI, contextId, state);
    const shuffledContextTrackIds = state.player.isShuffled ? 
                                    getShuffledTrackIds(trackId, contextTrackIds) : [];
    // Finally dispatch the plain action, with the trackId, context uri, array of track ids for the context,
    // and if isShuffled was true, the array of shuffled track ids for the current context. 
    dispatch(standardSelectTrackPlainAction(
        trackId,
        contextURI,
        contextTrackIds,
        shuffledContextTrackIds
    ));
};

export const standardResumePlayer = () => ({
    type: actionTypes.STANDARD_RESUME_PLAYER
});

export const standardPausePlayer = () => ({
    type: actionTypes.STANDARD_PAUSE_PLAYER
});

const standardSkipForwardsPlainAction = (newTrackId, shouldPlay) => ({
    type: actionTypes.STANDARD_SKIP_FORWARDS,
    payload: {
        newTrackId,
        shouldPlay
    }
});

export const standardSkipForwards = () => (dispatch, getState) => {
    const { 
        isShuffled,
        repeat,
        trackId,
        contextTrackIds,
        shuffledContextTrackIds 
    } = getState().player;

    const trackIds = isShuffled ? shuffledContextTrackIds : contextTrackIds;
    const currentIndex = trackIds.findIndex(el => el === trackId);
    const nextIndex = currentIndex < trackIds.length - 1 ? currentIndex + 1 : 0;
    const nextTrackId = trackIds[nextIndex];
    // The next track should automatically start in all scenarios except for the scenario where we are
    // moving from the last track back to the first track and repeat is set to 'off'.
    const shouldPlay = !(nextIndex === 0 && repeat === 'off');
    dispatch(standardSkipForwardsPlainAction(
        nextTrackId,
        shouldPlay
    ));
}

const standardSkipBackwardsPlainAction = (newTrackId) => ({
    type: actionTypes.STANDARD_SKIP_BACKWARDS,
    payload: {
        newTrackId
    }
});

export const standardSkipBackwards = () => (dispatch, getState) => {
    const { 
        isShuffled,
        repeat,
        trackId,
        contextTrackIds,
        shuffledContextTrackIds 
    } = getState().player;
    const trackIds = isShuffled ? shuffledContextTrackIds : contextTrackIds;
    const currentIndex = trackIds.findIndex(el => el === trackId);
    let nextIndex;
    if (currentIndex > 0) {
        nextIndex = currentIndex - 1;
    } else {
        nextIndex = repeat === 'off' ? 0 : trackIds.length - 1;
    }
    const nextTrackId = trackIds[nextIndex];
    dispatch(standardSkipBackwardsPlainAction(nextTrackId))
};

export const standardSetRepeat = (newRepeatValue) => ({
    type: actionTypes.STANDARD_SET_REPEAT,
    payload: {
        newRepeatValue
    }
});

const standardSetShufflePlainAction = (newShuffleValue, shuffledContextTrackIds) => ({
    type: actionTypes.STANDARD_SET_SHUFFLE,
    payload: {
        newShuffleValue,
        shuffledContextTrackIds
    }
});

export const standardSetShuffle = () => (dispatch, getState) => {
    const {
        isShuffled,
        trackId,
        contextTrackIds
    } = getState().player;

    if (isShuffled) {
        return dispatch(standardSetShufflePlainAction(false, []));
    }

    const shuffledContextTrackIds = getShuffledTrackIds(trackId, contextTrackIds);
    dispatch(standardSetShufflePlainAction(true, shuffledContextTrackIds));
}