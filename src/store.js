import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import { authURL } from './constants';

//  Look for accessToken in localStorage.
//  Return it if it's present and if it's still valid (worked out by timestamp) so that 
//  the store is initialized with the pre-existing accessToken. 
//  However if any of the conditions aren't met, return undefined so that the store is 
//  initialized with the defaultstate defined in the reducers.
const loadTokenFromLocalStorage = () => {
    try {
        const JSONAccessToken = localStorage.getItem('accessToken');
        if (JSONAccessToken === null) { 
            return undefined; 
        }
        const accessToken = JSON.parse(JSONAccessToken);
        if (Date.now() - accessToken.timestamp > 3000000) {
            return undefined;
        }
        return {
            accessToken: accessToken
        };
    } catch(err) {
        return undefined;
    }
};

const loadUserInfoFromLocalStorage = () => {
    try {
        const JSONUserInfo = localStorage.getItem('userInfo');
        if (JSONUserInfo === null) {
            return undefined;
        }
        const userInfo = JSON.parse(JSONUserInfo);
        return {
            userInfo: userInfo
        };
    } catch (err) {
        return undefined;
    }
}

const authMiddleware = store => next => action => {
    if (action.type === 'STORE_TOKEN') {
        return next(action);
    }
    // get state from store
    const timestamp = store.getState().accessToken.timestamp;
    const currentTime = Date.now();
    // check if token is expired
    // if it is, just return the action as normal
    // if it isn't, redirect user to spotifys auth page
    if (timestamp !== null && currentTime - timestamp > 3000000) {
        window.location = authURL;
        return;
    }
    return next(action);
};


const localStorageToken = loadTokenFromLocalStorage();
const localStorageUserInfo = loadUserInfoFromLocalStorage();

const combinedInitialState = {
    ...localStorageToken,
    ...localStorageUserInfo
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    combinedInitialState,
    composeEnhancers(
        applyMiddleware(authMiddleware, thunk)
    )
);

export default store;