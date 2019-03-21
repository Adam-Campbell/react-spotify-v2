import * as actionTypes from '../../actionTypes';
import { addOrMerge } from '../../utils';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_CATEGORIES:
            return addOrMerge(state, action.payload.categoryEntities);

        default:
            return state;
    }
};

export default reducer;