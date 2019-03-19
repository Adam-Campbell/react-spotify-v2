import * as actionTypes from '../actionTypes';

const defaultState = {};

const entityMetaData = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ALBUM_SUCCESS:
            return {
                ...state,
                [action.payload.albumId]: action.payload.timestamp
            };

        case actionTypes.FETCH_ARTIST_SUCCESS:
            return {
                ...state,
                [action.payload.artistId]: action.payload.timestamp
            };

        case actionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                [action.payload.categoryId]: action.payload.timestamp
            };

        case actionTypes.FETCH_PLAYLIST_SUCCESS:
            return {
                ...state,
                [action.payload.playlistId]: action.payload.timestamp
            };

        default: 
            return state;
    }
}

export default entityMetaData;