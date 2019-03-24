import reducer from './entitiesReducer';
import * as actionTypes from '../../actionTypes';
import { albumObject, albumObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_ALBUMS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_ALBUMS,
        payload: {
            albumEntities: {
                [albumObjectId]: albumObject
            }
        }
    })).toEqual({
        [albumObjectId]: albumObject
    });
});