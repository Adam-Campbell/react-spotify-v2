import * as actionTypes from '../actionTypes';
import reducer from './accessTokenReducer';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({
        token: '',
        timestamp: null
    });
});

test('handles STORE_TOKEN', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_TOKEN,
        payload: {
            token: 'BQBnf1u_fEO44RxKM0a1r6rICtc3',
            timestamp: 1551288526455
        }
    })).toEqual({
        token: 'BQBnf1u_fEO44RxKM0a1r6rICtc3',
        timestamp: 1551288526455
    });
});