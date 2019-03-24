import reducer from './relatedArtistIdsReducer';
import * as actionTypes from '../../actionTypes';
import { artistObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_ARTIST_RELATED_ARTIST_IDS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_ARTIST_RELATED_ARTIST_IDS,
        payload: {
            ownerId: artistObjectId,
            relatedArtistIds: [ '51J0q8S7W3kIEYHQi3EPqk' ]
        }
    })).toEqual({
        [artistObjectId]: [ '51J0q8S7W3kIEYHQi3EPqk' ]
    })
});