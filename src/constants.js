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

export const authURL = `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&show_dialog=false&scope=${permissionsRequired.join(',')}`;

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
    alternate: 'button--alternate',
    white: 'button--white'
};