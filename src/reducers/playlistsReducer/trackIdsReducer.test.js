import reducer from './trackIdsReducer';
import * as actionTypes from '../../actionTypes';
import { playlistObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_PLAYLIST_TRACK_IDS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_PLAYLIST_TRACK_IDS,
        payload: {
            ownerId: playlistObjectId,
            playlistTrackIds: [ '7fHbSPZaGS55A80DqDLssC' ]
        }
    })).toEqual({
        [playlistObjectId]: [ '7fHbSPZaGS55A80DqDLssC' ]
    });
});

test('handles ADD_TRACK_TO_PLAYLIST_SUCCESS', () => {
    expect(reducer({
        [playlistObjectId]: [ '7fHbSPZaGS55A80DqDLssC' ]
    }, {
        type: actionTypes.ADD_TRACK_TO_PLAYLIST_SUCCESS,
        payload: {
            playlistId: playlistObjectId,
            trackId: '066HNnIEcYkMZ4UumfTLmN'
        }
    })).toEqual({
        [playlistObjectId]: [ '7fHbSPZaGS55A80DqDLssC', '066HNnIEcYkMZ4UumfTLmN' ]
    });
});

test('handles REMOVE_TRACK_FROM_PLAYLIST_SUCCESS', () => {
    expect(reducer({
        [playlistObjectId]: [ '7fHbSPZaGS55A80DqDLssC', '066HNnIEcYkMZ4UumfTLmN' ]
    }, {
        type: actionTypes.REMOVE_TRACK_FROM_PLAYLIST_SUCCESS,
        payload: {
            playlistId: playlistObjectId,
            trackId: '066HNnIEcYkMZ4UumfTLmN'
        }
    })).toEqual({
        [playlistObjectId]: [ '7fHbSPZaGS55A80DqDLssC' ]
    })
});