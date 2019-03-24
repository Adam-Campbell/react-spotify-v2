import reducer from './timestampsReducer';
import * as actionTypes from '../../actionTypes';
import { categoryObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles FETCH_ARTIST_SUCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_CATEGORY_SUCCESS,
        payload: {
            categoryId: categoryObjectId,
            timestamp: 1553458874883
        }
    })).toEqual({
        [categoryObjectId]: 1553458874883
    });
});