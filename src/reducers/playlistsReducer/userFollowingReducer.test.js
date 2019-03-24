import reducer from './userFollowingReducer';
import * as actionTypes from '../../actionTypes';
import { playlistObjectId } from '../../spotifyObjectMocks';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_USER_FOLLOWING_PLAYLIST', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_USER_FOLLOWING_PLAYLIST,
        payload: {
            playlistId: playlistObjectId,
            isFollowing: true
        }
    })).toEqual({
        [playlistObjectId]: true
    });
});

test('handles FOLLOW_PLAYLIST_SUCCESS', () => {
    expect(reducer({
        [playlistObjectId]: false
    }, {
        type: actionTypes.FOLLOW_PLAYLIST_SUCCESS,
        payload: {
            playlistId: playlistObjectId
        }
    })).toEqual({
        [playlistObjectId]: true
    });
});

test('handles UNFOLLOW_PLAYLIST_SUCCESS', () => {
    expect(reducer({
        [playlistObjectId]: true
    }, {
        type: actionTypes.UNFOLLOW_PLAYLIST_SUCCESS,
        payload: {
            playlistId: playlistObjectId
        }
    })).toEqual({
        [playlistObjectId]: false
    });
});
