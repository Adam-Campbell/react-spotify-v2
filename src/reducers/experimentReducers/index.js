import { combineReducers } from 'redux';
import sliceA from './sliceAReducer';
import sliceB from './sliceBReducer';

export default combineReducers({
    sliceA,
    sliceB
});

