import * as actionTypes from '../actionTypes';

const defaultState = {};

const categoryFetchedAt = (state=defaultState, action) => {
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

export default categoryFetchedAt;