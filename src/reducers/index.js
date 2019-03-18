import { combineReducers } from 'redux';
import accessToken from './accessTokenReducer';
import user from './userReducer';
import artists from './artistsReducer';
import tracks from './tracksReducer';
import albums from './albumsReducer';
import playlists from './playlistsReducer';
import highlights from './highlightsReducer';
import categories from './categoriesReducer';
import transitions from './transitionsReducer';
import modal from './modalReducer';
import player from './playerReducer';


import artistEntities from './artistEntitiesReducer';
import artistAlbums from './artistAlbumsReducer';
import artistTopTracks from './artistTopTracksReducer';
import artistRelatedArtists from './artistRelatedArtistsReducer';
import artistFetchedAt from './artistFetchedAtReducer';

import albumEntities from './albumEntitiesReducer';
import albumTracks from './albumTracksReducer';
import albumFetchedAt from './albumFetchedAtReducer';

import categoryEntities from './categoryEntitiesReducer';
import categoryPlaylists from './categoryPlaylistsReducer';
import categoryFetchedAt from './categoryFetchedAtReducer';

import playlistEntities from './playlistEntitiesReducer';
import playlistTracks from './playlistTracksReducer';
import playlistFetchedAt from './playlistFetchedAtReducer';
import userFollowingPlaylist from './userFollowingPlaylistReducer';

export default combineReducers({
    accessToken,
    user,
    //artists,
    artistEntities,
    artistAlbums,
    artistTopTracks,
    artistRelatedArtists,
    artistFetchedAt,
    tracks,
    //albums,
    albumEntities,
    albumTracks,
    albumFetchedAt,
    //playlists,
    playlistEntities,
    playlistTracks,
    playlistFetchedAt,
    userFollowingPlaylist,
    highlights,
    //categories,
    categoryEntities,
    categoryPlaylists,
    categoryFetchedAt,
    transitions,
    modal,
    player
});