import * as actionTypes from '../../actionTypes';
import { addOrMerge } from '../../utils';

const defaultState = {};

const reducer = (state=defaultState, action) => {
    switch (action.type) {

        case actionTypes.STORE_ARTISTS:
            return addOrMerge(state, action.payload.artistEntities);

        default: 
            return state;
    }
}

export default reducer;