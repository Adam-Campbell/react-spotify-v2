import * as actionTypes from '../../actionTypes';

const defaultState = {
    imageWidth: null,
    imageHeight: null,
    imageX: null,
    imageY: null,
    hasTransition: false
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {
        case actionTypes.STORE_TRANSITION_IMAGE_RECT:
            return {
                ...action.payload,
                hasTransition: true
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
