import { combineReducers } from 'redux';
// entities
import artists from './artistsReducer';
import albums from './albumsReducer';
import categories from './categoriesReducer';
import playlists from './playlistsReducer';
import tracks from './tracksReducer';
// app state
import accessToken from './accessTokenReducer';
import user from './userReducer';
import highlights from './highlightsReducer';
import player from './playerReducer';
// ui
import transitions from './transitionsReducer';
import modal from './modalReducer';



// not using currently

//import entityMetaData from './entityMetaDataReducer';
//import uiStatus from './uiStatusReducer';


export default combineReducers({
    artists,
    albums,
    tracks,
    categories,
    playlists,
    accessToken,
    user,
    highlights,
    player,
    transitions,
    modal
});