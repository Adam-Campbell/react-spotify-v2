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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: []
    });
});

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
                uri: 'spotify:user:joebloggs'
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: []
    });
});

test('handles STORE_USERS_TOP_ARTISTS', () => {
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: []
    }, {
        type: actionTypes.STORE_USERS_TOP_ARTISTS,
        payload: {
            artistIds: [
                '24XtlMhEMNdi822vi0MhY1',
                '0iMnpaEHXkgMT956CmP1kj',
                '6d24kC5fxHFOSEAmjQPPhc'
            ]
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
        topArtistsIds: [
            '24XtlMhEMNdi822vi0MhY1',
            '0iMnpaEHXkgMT956CmP1kj',
            '6d24kC5fxHFOSEAmjQPPhc'
        ],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: []
    });
});

test('handles STORE_USERS_RECENT_TRACKS', () => {
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: []
    }, {
        type: actionTypes.STORE_USERS_RECENT_TRACKS,
        payload: {
            trackIds: [
                '2vfYs0MWqvIjLhWFoYkPSZ',
                '5yotNCnj3l9JUfCSXi0kNQ',
                '3ZHfX6kbiY7JVsB63lLOLu'
            ]
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
        topArtistsIds: [],
        recentTracksIds: [
            '2vfYs0MWqvIjLhWFoYkPSZ',
            '5yotNCnj3l9JUfCSXi0kNQ',
            '3ZHfX6kbiY7JVsB63lLOLu'
        ],
        playlistIds: [],
        followedArtistIds: []
    });
});

test('handles STORE_USERS_PLAYLISTS', () => {
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: []
    }, {
        type: actionTypes.STORE_USERS_PLAYLISTS,
        payload: {
            playlistIds: [
                '2vfYs0MWqvIjLhWFoYkPSZ',
                '5yotNCnj3l9JUfCSXi0kNQ',
                '3ZHfX6kbiY7JVsB63lLOLu'
            ]
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [
            '2vfYs0MWqvIjLhWFoYkPSZ',
            '5yotNCnj3l9JUfCSXi0kNQ',
            '3ZHfX6kbiY7JVsB63lLOLu'
        ],
        followedArtistIds: []
    })
})

test('handles STORE_USERS_FOLLOWED_ARTISTS', () => {
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: []
    }, {
        type: actionTypes.STORE_USERS_FOLLOWED_ARTISTS,
        payload: {
            artistIds: [
                '0exhrQcReCdr11oPbOh22M',
                '2YZyLoL8N0Wb9xBt1NhZWg',
                '2xe8IXgCTpwHE3eA9hTs4n'
            ]
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ]
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ]
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n',
            '6fVcDUckTwxqg56qNsEvUr'
        ]
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n',
            '6fVcDUckTwxqg56qNsEvUr'
        ]
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [],
        followedArtistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ]
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ],
        followedArtistIds: []
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
        topArtistsIds: [],
        recentTracksIds: [],
        playlistIds: [
            '4vGrte8FDu062Ntj0RsPiZ',
            '0exhrQcReCdr11oPbOh22M',
            '2YZyLoL8N0Wb9xBt1NhZWg',
            '2xe8IXgCTpwHE3eA9hTs4n'
        ],
        followedArtistIds: []
    });
});