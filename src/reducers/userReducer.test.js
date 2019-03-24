import * as actionTypes from '../actionTypes';
import reducer from './userReducer';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({
        birthdate: '',
        country: '',
        display_name: '',
        email: '',
        external_urls: {},
        followers: {},
        href: '',
        id: '',
        images: [],
        product: '',
        type: '',
        uri: '',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [],
        followedArtistIds: [],
        fullProfileFetched: false
    });
});

test('handles FETCH_USER_SUCCESS', () => {
    expect(reducer(undefined, {
        type: actionTypes.FETCH_USER_SUCCESS
    })).toEqual({
        birthdate: '',
        country: '',
        display_name: '',
        email: '',
        external_urls: {},
        followers: {},
        href: '',
        id: '',
        images: [],
        product: '',
        type: '',
        uri: '',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [],
        followedArtistIds: [],
        fullProfileFetched: true
    });
})

test('handles STORE_USERS_PROFILE', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_USERS_PROFILE,
        payload: {
            usersProfile: {
                birthdate: '1991-01-01',
                country: 'GB',
                display_name: 'Joe Bloggs',
                email: 'joe@email.com',
                external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
                followers: { href: null, total: 18 },
                href: 'https://api.spotify.com/v1/users/joebloggs',
                id: 'joebloggs',
                images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
                product: 'premium',
                type: 'user',
                uri: 'spotify:user:joebloggs',
                topArtistIds: [ '2vfYs0MWqvIjLhWFoYkPSZ' ],
                recentTrackIds: [ '5yotNCnj3l9JUfCSXi0kNQ' ],
                playlistIds: [ '3ZHfX6kbiY7JVsB63lLOLu' ],
                followedArtistIds: [],
            }
        }
    })).toEqual({
        birthdate: '1991-01-01',
        country: 'GB',
        display_name: 'Joe Bloggs',
        email: 'joe@email.com',
        external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
        followers: { href: null, total: 18 },
        href: 'https://api.spotify.com/v1/users/joebloggs',
        id: 'joebloggs',
        images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:joebloggs',
        topArtistIds: [ '2vfYs0MWqvIjLhWFoYkPSZ' ],
        recentTrackIds: [ '5yotNCnj3l9JUfCSXi0kNQ' ],
        playlistIds: [ '3ZHfX6kbiY7JVsB63lLOLu' ],
        followedArtistIds: [],
        fullProfileFetched: false
    });
});


test('handles FOLLOW_ARTIST_SUCCESS', () => {
    expect(reducer({
        birthdate: '1991-01-01',
        country: 'GB',
        display_name: 'Joe Bloggs',
        email: 'joe@email.com',
        external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
        followers: { href: null, total: 18 },
        href: 'https://api.spotify.com/v1/users/joebloggs',
        id: 'joebloggs',
        images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:joebloggs',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ],
        fullProfileFetched: true
    }, {
        type: actionTypes.FOLLOW_ARTIST_SUCCESS,
        payload: {
            artistId: '6fVcDUckTwxqg56qNsEvUr'
        }
    })).toEqual({
        birthdate: '1991-01-01',
        country: 'GB',
        display_name: 'Joe Bloggs',
        email: 'joe@email.com',
        external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
        followers: { href: null, total: 18 },
        href: 'https://api.spotify.com/v1/users/joebloggs',
        id: 'joebloggs',
        images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:joebloggs',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n',
            '6fVcDUckTwxqg56qNsEvUr'
        ],
        fullProfileFetched: true
    });
});

test('handles UNFOLLOW_ARTIST_SUCCESS', () => {
    expect(reducer({
        birthdate: '1991-01-01',
        country: 'GB',
        display_name: 'Joe Bloggs',
        email: 'joe@email.com',
        external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
        followers: { href: null, total: 18 },
        href: 'https://api.spotify.com/v1/users/joebloggs',
        id: 'joebloggs',
        images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:joebloggs',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n',
            '6fVcDUckTwxqg56qNsEvUr'
        ],
        fullProfileFetched: true
    }, {
        type: actionTypes.UNFOLLOW_ARTIST_SUCCESS,
        payload: {
            artistId: '6fVcDUckTwxqg56qNsEvUr'
        }
    })).toEqual({
        birthdate: '1991-01-01',
        country: 'GB',
        display_name: 'Joe Bloggs',
        email: 'joe@email.com',
        external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
        followers: { href: null, total: 18 },
        href: 'https://api.spotify.com/v1/users/joebloggs',
        id: 'joebloggs',
        images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:joebloggs',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ],
        fullProfileFetched: true
    });
});

test('handles CREATE_PLAYLIST_SUCCESS', () => {
    expect(reducer({
        birthdate: '1991-01-01',
        country: 'GB',
        display_name: 'Joe Bloggs',
        email: 'joe@email.com',
        external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
        followers: { href: null, total: 18 },
        href: 'https://api.spotify.com/v1/users/joebloggs',
        id: 'joebloggs',
        images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:joebloggs',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ],
        followedArtistIds: [],
        fullProfileFetched: true
    }, {
        type: actionTypes.CREATE_PLAYLIST_SUCCESS,
        payload: {
            playlistId: '4vGrte8FDu062Ntj0RsPiZ',
        }
    })).toEqual({
        birthdate: '1991-01-01',
        country: 'GB',
        display_name: 'Joe Bloggs',
        email: 'joe@email.com',
        external_urls: { spotify: 'https://open.spotify.com/user/joebloggs' },
        followers: { href: null, total: 18 },
        href: 'https://api.spotify.com/v1/users/joebloggs',
        id: 'joebloggs',
        images: [ { height: null, width: null, url: 'https://cdn.com/image' } ],
        product: 'premium',
        type: 'user',
        uri: 'spotify:user:joebloggs',
        topArtistIds: [],
        recentTrackIds: [],
        playlistIds: [
            '4vGrte8FDu062Ntj0RsPiZ',
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ],
        followedArtistIds: [],
        fullProfileFetched: true
    });
});