import * as actionTypes from '../../actionTypes';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                [action.payload.categoryId]: action.payload.timestamp
            };

        default:
            return state;
    }
};

export default reducer;
