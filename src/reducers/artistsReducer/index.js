import { combineReducers } from 'redux';
import entities from './entitiesReducer';
import albumIds from './albumIdsReducer';
import relatedArtistIds from './relatedArtistIdsReducer';
import topTrackIds from './topTrackIdsReducer';
import timestamps from './timestampsReducer';

export default combineReducers({
    entities,
    albumIds,
    relatedArtistIds,
    topTrackIds,
    timestamps
});
