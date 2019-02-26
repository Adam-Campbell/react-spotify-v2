import * as actionTypes from '../actionTypes';

// repeat is either 'track', 'context' or 'off'

const defaultState = {
    isActive: false,
    isPlaying: false,
    isShuffled: false,
    repeat: 'context',
    trackId: '',
    contextURI: '',
    contextTrackIds: [],
    shuffledContextTrackIds: [],
    SDKAvailable: false,
    deviceId: null
};

// repeat modes - 1 === 'context', 2 === 'track', 0 === 'off'. Context is the default when using SDK. 

const repeatModeStrings = ['off', 'context', 'track'];

const player = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.SDK_UPDATE_PLAYER_STATE:
            return {
                ...state,
                isPlaying: action.payload.isPlaying,
                trackId: action.payload.trackId,
                isShuffled: action.payload.isShuffled,
                repeat: repeatModeStrings[action.payload.repeatMode]
            };

        case actionTypes.SDK_SELECT_TRACK_SUCCESS:
            return {
                ...state,
                contextURI: action.payload.newContextURI,
                isActive: true
            };

        case actionTypes.CONFIRM_SDK_AVAILABLE:
            return {
                ...state,
                SDKAvailable: true,
                deviceId: action.payload.deviceId
            };

        case actionTypes.STANDARD_SELECT_TRACK:
            return {
                ...state,
                isPlaying: true,
                trackId: action.payload.trackId,
                repeat: state.repeat === 'track' ? 'context' : state.repeat,
                contextURI: action.payload.contextURI,
                contextTrackIds: action.payload.contextTrackIds,
                shuffledContextTrackIds: action.payload.shuffledContextTrackIds,
                isActive: true
            };

        case actionTypes.STANDARD_PAUSE_PLAYER:
            return {
                ...state,
                isPlaying: false
            };

        case actionTypes.STANDARD_RESUME_PLAYER:
            return {
                ...state,
                isPlaying: true
            };

        case actionTypes.STANDARD_SKIP_FORWARDS:
            return {
                ...state,
                trackId: action.payload.newTrackId,
                isPlaying: action.payload.shouldPlay,
                repeat: state.repeat === 'track' ? 'context' : state.repeat
            };

        case actionTypes.STANDARD_SKIP_BACKWARDS:
            return {
                ...state,
                trackId: action.payload.newTrackId
            };

        case actionTypes.STANDARD_SET_SHUFFLE:
            return {
                ...state,
                isShuffled: action.payload.newShuffleValue,
                shuffledContextTrackIds: action.payload.shuffledContextTrackIds
            };

        case actionTypes.STANDARD_SET_REPEAT:
            return {
                ...state,
                repeat: action.payload.newRepeatValue
            }

        default: 
            return state;
    }
}

export default player;