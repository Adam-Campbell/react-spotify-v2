import * as ActionTypes from '../actionTypes';

const defaultState = {
    token: '',
    timestamp: null
};

const accessToken = (state=defaultState, action) => {
    switch(action.type) {
        case ActionTypes.STORE_TOKEN:
            return {
                ...action.payload
            }

        default:
            return state;
    }
}

export default accessToken;