import reducer from './timestampsReducer';
import * as actionTypes from '../../actionTypes';
import { playlistObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles FETCH_PLAYLIST_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_PLAYLIST_SUCCESS,
        payload: {
            playlistId: playlistObjectId,
            timestamp: 1553458874883
        }
    })).toEqual({
        [playlistObjectId]: 1553458874883
    });
});