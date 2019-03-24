import reducer from './timestampsReducer';
import * as actionTypes from '../../actionTypes';
import { albumObjectId } from '../../spotifyObjectMocks';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles FETCH_ALBUM_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_ALBUM_SUCCESS,
        payload: {
            albumId: albumObjectId,
            timestamp: 1553458874883
        }
    })).toEqual({
        [albumObjectId]: 1553458874883
    });
});

