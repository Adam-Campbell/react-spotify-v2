const permissionsRequired = [
    'playlist-modify-private',
    'playlist-modify-public',
    'playlist-read-collaborative',
    'playlist-read-private',
    'streaming',
    'ugc-image-upload',
    'user-follow-modify',
    'user-follow-read',
    'user-library-read',
    'user-modify-playback-state',
    'user-read-birthdate',
    'user-read-email',
    'user-read-playback-state',
    'user-read-private',
    'user-read-recently-played',
    'user-top-read'   
];
const clientID = 'bc785a3e64da41a8a122a4458dc4afc3';
//const redirectURI = process.env.callbackURL;

// Normal redirect uri
//const redirectURI = 'http%3A%2F%2Flocalhost%3A3000';

// Redirect uri for testing on mobile
//const redirectURI = 'http%3A%2F%2F192.168.1.67%3A3000';

// Redirect uri to specific auth url
const redirectURI = 'http%3A%2F%2Flocalhost%3A3000%2Fauth';

// Redirect uri to auth url for mobile testing
//const redirectURI = 'http%3A%2F%2F192.168.1.67%3A3000%2Fauth';


export const authURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectURI}&show_dialog=false&scope=${permissionsRequired.join(',')}`;

export const collectionTypes = {
    artists: 'ARTISTS',
    albums: 'ALBUMS',
    playlists: 'PLAYLISTS',
    categories: 'CATEGORIES'
};

export const modalTypes = {
    uploadImage: 'UPLOAD_IMAGE',
    createPlaylist: 'CREATE_PLAYLIST',
    addToPlaylist: 'ADD_TO_PLAYLIST'
};

export const buttonThemes = {
    standard: 'button--standard',
    warning: 'button--warning',
    alternate: 'button--alternate'
};