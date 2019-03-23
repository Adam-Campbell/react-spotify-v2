import { combineReducers } from 'redux';
import transitionData from './transitionDataReducer';
import loadingStatus from './loadingStatusReducer';

export default combineReducers({
    transitionData,
    loadingStatus
});
