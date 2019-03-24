import reducer from './entitiesReducer';
import * as actionTypes from '../../actionTypes';
import { artistObject, artistObjectId } from '../../spotifyObjectMocks';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_ARTISTS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_ARTISTS,
        payload: {
            artistEntities: {
                [artistObjectId]: artistObject
            }
        }
    })).toEqual({
        [artistObjectId]: artistObject
    });
});