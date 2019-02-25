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

export default combineReducers({
    accessToken,
    user,
    artists,
    tracks,
    albums,
    playlists,
    highlights,
    categories,
    transitions,
    modal,
    player
});