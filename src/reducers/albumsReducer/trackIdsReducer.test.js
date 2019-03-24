import reducer from './trackIdsReducer';
import * as actionTypes from '../../actionTypes';
import { albumObjectId, trackObjectId } from '../../spotifyObjectMocks';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_ALBUM_TRACK_IDS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_ALBUM_TRACK_IDS,
        payload: {
            ownerId: albumObjectId,
            albumTrackIds: [ trackObjectId ]
        }
    })).toEqual({
        [albumObjectId]: [ trackObjectId ]
    });
});
