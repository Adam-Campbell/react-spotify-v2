import reducer from './playlistIdsReducer';
import * as actionTypes from '../../actionTypes';
import { categoryObjectId, playlistObjectId } from '../../spotifyObjectMocks';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_CATEGORY_PLAYLIST_IDS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_CATEGORY_PLAYLIST_IDS,
        payload: {
            ownerId: categoryObjectId,
            playlistIds: [ playlistObjectId ]
        }
    })).toEqual({
        [categoryObjectId]: [ playlistObjectId ]
    });
});
