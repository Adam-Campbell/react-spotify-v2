import { combineReducers } from 'redux';
import entities from './entitiesReducer';
import trackIds from './trackIdsReducer';
import timestamps from './timestampsReducer';
import userFollowing from './userFollowingReducer';

export default combineReducers({
    entities,
    trackIds,
    timestamps,
    userFollowing
});
