import reducer from './topTrackIdsReducer';
import * as actionTypes from '../../actionTypes';
import { artistObjectId, trackObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_ARTIST_TOP_TRACK_IDS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_ARTIST_TOP_TRACK_IDS,
        payload: {
            ownerId: artistObjectId,
            trackIds: [ trackObjectId ]
        }
    })).toEqual({
        [artistObjectId]: [ trackObjectId ]
    });
});