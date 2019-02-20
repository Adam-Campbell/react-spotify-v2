import * as actionTypes from '../actionTypes';

// repeat is either 'track', 'context' or 'off'

const defaultState = {
    isPlaying: false,
    isShuffled: false,
    repeat: 'off',
    trackId: '',
    contextURI: '',
    SDKAvailable: false
};

const player = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.UPDATE_PLAYER_STATE:
            return {
                ...state,
                isPlaying: action.payload.isPlaying,
                trackId: action.payload.trackId
            };

        case actionTypes.SELECT_TRACK_SUCCESS:
            return {
                ...state,
                contextURI: action.payload.newContextURI
            };

        case actionTypes.SET_SHUFFLE_SUCCESS:
            return {
                ...state,
                isShuffled: action.payload.shuffleValue
            };

        case actionTypes.SET_REPEAT_SUCCESS:
            return {
                ...state,
                repeat: action.payload.newRepeatValue
            };

        case actionTypes.CONFIRM_SDK_AVAILABLE:
            return {
                ...state,
                SDKAvailable: true
            };

        default: 
            return state;
    }
}

export default player;