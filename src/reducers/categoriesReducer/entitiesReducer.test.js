import reducer from './entitiesReducer';
import * as actionTypes from '../../actionTypes';
import { categoryObject, categoryObjectId } from '../../spotifyObjectMocks';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_CATEGORIES', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_CATEGORIES,
        payload: {
            categoryEntities: {
                [categoryObjectId]: categoryObject
            }
        }
    })).toEqual({
        [categoryObjectId]: categoryObject
    });
});
