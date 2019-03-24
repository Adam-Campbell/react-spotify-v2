import reducer from './timestampsReducer';
import * as actionTypes from '../../actionTypes';
import { artistObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles FETCH_ARTIST_SUCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_ARTIST_SUCCESS,
        payload: {
            artistId: artistObjectId,
            timestamp: 1553458874883
        }
    })).toEqual({
        [artistObjectId]: 1553458874883
    });
});