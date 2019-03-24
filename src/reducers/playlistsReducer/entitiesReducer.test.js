import reducer from './entitiesReducer';
import * as actionTypes from '../../actionTypes';
import { playlistObject, playlistObjectId } from '../../spotifyObjectMocks';

test('returns default state', () => {
    expect(reducer(undefined, {})).toEqual({});
});

test('handles STORE_PLAYLISTS', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_PLAYLISTS,
        payload: {
            playlistEntities: {
                [playlistObjectId]: playlistObject
            }
        }
    })).toEqual({
        [playlistObjectId]: playlistObject
    });
});

test('handles UPDATE_PLAYLIST_NAME_SUCCESS', () => {
    const prevState = {
        '6Cas2wjtOVfw3I6xuCmigB': {
            name: 'Example playlist',
            id: '6Cas2wjtOVfw3I6xuCmigB',
            type: 'playlist'
        }
    };
    const expectedResult = {
        '6Cas2wjtOVfw3I6xuCmigB': {
            name: 'Updated name',
            id: '6Cas2wjtOVfw3I6xuCmigB',
            type: 'playlist'
        }
    };
    expect(reducer(prevState, {
        type: actionTypes.UPDATE_PLAYLIST_NAME_SUCCESS,
        payload: {
            playlistId: '6Cas2wjtOVfw3I6xuCmigB',
            newPlaylistName: 'Updated name'
        }
    })).toEqual(expectedResult);
});

test('handles UPDATE_PLAYLIST_IMAGE_SUCCESS', () => {
    const prevState = {
        '6Cas2wjtOVfw3I6xuCmigB': {
            name: 'Example playlist',
            id: '6Cas2wjtOVfw3I6xuCmigB',
            type: 'playlist',
            images: [
                {
                    height: 350,
                    width: 350,
                    url: 'https://cdn.com/oldImage'
                }
            ]
        }
    };
    const expectedResult = {
        '6Cas2wjtOVfw3I6xuCmigB': {
            name: 'Example playlist',
            id: '6Cas2wjtOVfw3I6xuCmigB',
            type: 'playlist',
            images: [
                {
                    height: null,
                    width: null,
                    url: '...tempURIForNewImage...'
                }
            ]
        }
    };
    expect(reducer(prevState, {
        type: actionTypes.UPDATE_PLAYLIST_IMAGE_SUCCESS,
        payload: {
            playlistId: '6Cas2wjtOVfw3I6xuCmigB',
            imageURI: '...tempURIForNewImage...'
        }
    })).toEqual(expectedResult);
});

test('handles CREATE_PLAYLIST_SUCCESS', () => {
    const newPlaylistObject = {
        name: 'New Playlist',
        id: '6Cas2wjtOVfw3I6xuCmigB'
    };
    expect(reducer(undefined, {
        type: actionTypes.CREATE_PLAYLIST_SUCCESS,
        payload: {
            playlistId: '6Cas2wjtOVfw3I6xuCmigB',
            playlistObject: newPlaylistObject
        }
    })).toEqual({
        '6Cas2wjtOVfw3I6xuCmigB': newPlaylistObject
    })
});
