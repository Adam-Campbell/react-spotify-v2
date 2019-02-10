import * as actionTypes from '../actionTypes';

const defaultState = {
    imageWidth: null,
    imageHeight: null,
    imageX: null,
    imageY: null
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.STORE_TRANSITION_IMAGE_RECT:
            return {
                ...action.payload
            };

        case actionTypes.PURGE_TRANSITION_IMAGE_RECT:
            return {
                ...defaultState
            };

        default:
            return state;
    }
}

export default reducer;

