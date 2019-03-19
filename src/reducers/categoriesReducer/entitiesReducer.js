import * as actionTypes from '../../actionTypes';
import { addOrMerge } from '../../utils';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_CATEGORIES:
            return addOrMerge(state, action.payload.categoryObjects);

        case actionTypes.STORE_CATEGORY_INFO:
            return addOrMerge(state, action.payload.categoryObject, action.payload.categoryId);

        default:
            return state;
    }
};

export default reducer;