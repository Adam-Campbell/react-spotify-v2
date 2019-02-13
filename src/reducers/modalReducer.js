import * as actionTypes from '../actionTypes';

const defaultState = {
    modalType: null,
    modalProps: {}
};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.OPEN_MODAL:
            return {
                modalType: action.payload.modalType,
                modalProps: action.payload.modalProps
            };

        case actionTypes.CLOSE_MODAL:
            return defaultState;

        default: 
            return state;
    }
}

export default reducer;