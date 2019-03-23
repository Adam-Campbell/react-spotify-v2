import * as actionTypes from '../actionTypes';
import { addOrMerge } from '../utils';

const defaultState = {};

const tracks = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_TRACKS:
            return addOrMerge(state, action.payload.trackEntities);

        default:
            return state;
    }
}

export default tracks;