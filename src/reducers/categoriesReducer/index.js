import { combineReducers } from 'redux';
import entities from './entitiesReducer';
import playlistIds from './playlistIdsReducer';
import timestamps from './timestampsReducer';

export default combineReducers({
    entities,
    playlistIds,
    timestamps
});
