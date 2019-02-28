import * as actionTypes from '../actionTypes';
import reducer from './playerReducer';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({
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
    });
});

test('handles CONFIRM_SDK_AVAILABLE', () => {
    expect(reducer(undefined, {
        type: actionTypes.CONFIRM_SDK_AVAILABLE,
        payload: {
            deviceId: '1cbc2e1c6da6026df23e009078f01a66a45bf9d6'
        }
    })).toEqual({
        isActive: false,
        isPlaying: false,
        isShuffled: false,
        repeat: 'context',
        trackId: '',
        contextURI: '',
        contextTrackIds: [],
        shuffledContextTrackIds: [],
        SDKAvailable: true,
        deviceId: '1cbc2e1c6da6026df23e009078f01a66a45bf9d6'
    });
});

test('handles SDK_SELECT_TRACK_SUCCESS', () => {
    expect(reducer({
        isActive: false,
        isPlaying: false,
        isShuffled: false,
        repeat: 'context',
        trackId: '',
        contextURI: '',
        contextTrackIds: [],
        shuffledContextTrackIds: [],
        SDKAvailable: true,
        deviceId: '1cbc2e1c6da6026df23e009078f01a66a45bf9d6'
    }, {
        type: actionTypes.SDK_SELECT_TRACK_SUCCESS,
        payload: {
            newContextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1'
        }
    })).toEqual({
        isActive: true,
        isPlaying: false,
        isShuffled: false,
        repeat: 'context',
        trackId: '',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [],
        shuffledContextTrackIds: [],
        SDKAvailable: true,
        deviceId: '1cbc2e1c6da6026df23e009078f01a66a45bf9d6'
    });
});

test('handles SDK_UPDATE_PLAYER_STATE', () => {
    expect(reducer({
        isActive: true,
        isPlaying: false,
        isShuffled: false,
        repeat: 'context',
        trackId: '',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [],
        shuffledContextTrackIds: [],
        SDKAvailable: true,
        deviceId: '1cbc2e1c6da6026df23e009078f01a66a45bf9d6'
    }, {
        type: actionTypes.SDK_UPDATE_PLAYER_STATE,
        payload: {
            isPlaying: true,
            trackId: '48O6kz322Dzu1R6Al5147q',
            isShuffled: true,
            repeatMode: 2 
        }
    })).toEqual({
        isActive: true,
        isPlaying: true,
        isShuffled: true,
        repeat: 'track',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [],
        shuffledContextTrackIds: [],
        SDKAvailable: true,
        deviceId: '1cbc2e1c6da6026df23e009078f01a66a45bf9d6'
    });
});

test('handles STANDARD_SELECT_TRACK', () => {
    expect(reducer(undefined, {
        type: actionTypes.STANDARD_SELECT_TRACK,
        payload: {
            trackId: '48O6kz322Dzu1R6Al5147q',
            contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
            contextTrackIds: [
                '6PsISpFaCEKwysPfwO9SfC',
                '48O6kz322Dzu1R6Al5147q',
                '3kj21bGH2CrtMmoOpFvL34',
                '6um5ccNzX7k3SRsVnLupvI',
                '1H4LTkJtNHLQ3n7pTi7uDw'
            ],
            shuffledContextTrackIds: []   
        }
    })).toEqual({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    })
});

test('handles STANDARD_PAUSE_PLAYER', () => {
    expect(reducer({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    }, {
        type: actionTypes.STANDARD_PAUSE_PLAYER
    })).toEqual({
        isActive: true,
        isPlaying: false,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    });
});

test('handles STANDARD_RESUME_PLAYER', () => {
    expect(reducer({
        isActive: true,
        isPlaying: false,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    }, {
        type: actionTypes.STANDARD_RESUME_PLAYER
    })).toEqual({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    });
});

test('handles STANDARD_SKIP_FORWARDS', () => {
    expect(reducer({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    }, {
        type: actionTypes.STANDARD_SKIP_FORWARDS,
        payload: {
            newTrackId: '3kj21bGH2CrtMmoOpFvL34',
            shouldPlay: true
        }
    })).toEqual({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '3kj21bGH2CrtMmoOpFvL34',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    });
});

test('handles STANDARD_SKIP_BACKWARDS', () => {
    expect(reducer({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '3kj21bGH2CrtMmoOpFvL34',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    }, {
        type: actionTypes.STANDARD_SKIP_BACKWARDS,
        payload: {
            newTrackId: '48O6kz322Dzu1R6Al5147q'
        }
    })).toEqual({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    });
});

test('handles STANDARD_SET_SHUFFLE', () => {
    expect(reducer({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    }, {
        type: actionTypes.STANDARD_SET_SHUFFLE,
        payload: {
            newShuffleValue: true,
            shuffledContextTrackIds: [
                '48O6kz322Dzu1R6Al5147q',
                '1H4LTkJtNHLQ3n7pTi7uDw',
                '3kj21bGH2CrtMmoOpFvL34',
                '6PsISpFaCEKwysPfwO9SfC',
                '6um5ccNzX7k3SRsVnLupvI'
            ]
        }
    })).toEqual({
        isActive: true,
        isPlaying: true,
        isShuffled: true,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [
            '48O6kz322Dzu1R6Al5147q',
            '1H4LTkJtNHLQ3n7pTi7uDw',
            '3kj21bGH2CrtMmoOpFvL34',
            '6PsISpFaCEKwysPfwO9SfC',
            '6um5ccNzX7k3SRsVnLupvI'
        ],
        SDKAvailable: false,
        deviceId: null
    });
});

test('handles STANDARD_SET_REPEAT', () => {
    expect(reducer({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'context',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    }, {
        type: actionTypes.STANDARD_SET_REPEAT,
        payload: {
            newRepeatValue: 'track'
        }
    })).toEqual({
        isActive: true,
        isPlaying: true,
        isShuffled: false,
        repeat: 'track',
        trackId: '48O6kz322Dzu1R6Al5147q',
        contextURI: 'spotify:artist:24XtlMhEMNdi822vi0MhY1',
        contextTrackIds: [
            '6PsISpFaCEKwysPfwO9SfC',
            '48O6kz322Dzu1R6Al5147q',
            '3kj21bGH2CrtMmoOpFvL34',
            '6um5ccNzX7k3SRsVnLupvI',
            '1H4LTkJtNHLQ3n7pTi7uDw'
        ],
        shuffledContextTrackIds: [],
        SDKAvailable: false,
        deviceId: null
    });
});
