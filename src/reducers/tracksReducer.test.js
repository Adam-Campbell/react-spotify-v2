import reducer from './tracksReducer';
import * as actionTypes from '../actionTypes';
import { trackObject, trackObjectId } from '../spotifyObjectMocks';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_TRACKS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_TRACKS,
        payload: {
            trackEntities: {
                [trackObjectId]: trackObject
            }
        }
    })).toEqual({
        [trackObjectId]: trackObject
    });
});
