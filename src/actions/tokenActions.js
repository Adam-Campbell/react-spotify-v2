import * as ActionTypes from '../actionTypes';

export const storeToken = (token, timestamp) => ({
    type: ActionTypes.STORE_TOKEN,
    payload: {
        token,
        timestamp
    }
});
