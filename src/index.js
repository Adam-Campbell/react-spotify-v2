import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import './sharedStyles/index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store from './store';
import { SDKUpdatePlayerState, confirmSDKAvailable } from './actions';

let player;

/**
 * Determines whether the player should attempt to connect or not - if it tries to connect when there is not a 
 * token available either through window.location.hash or local storage then it will cause an error.
 */
const shouldAttemptToConnect = () => {
  if (window.location.hash) {
    return true;
  }
  const JSONAccessToken = localStorage.getItem('accessToken');
  if (JSONAccessToken) {
    const accessToken = JSON.parse(JSONAccessToken);
    if (Date.now() - accessToken.timestamp < 3600000) {
      return true;
    }
  }
  return false;
};

window.onSpotifyWebPlaybackSDKReady = () => {
    console.log('Spotify web playback SDK is ready');
    player = new window.Spotify.Player({
      name: 'Reactify Player',
      getOAuthToken: (cb) => {
        let token;
        if (window.location.hash) {
          token = window.location.hash.replace(/.*access_token=([^&]+).*/, '$1');
          return cb(token);
        } else {
          const JSONAccessToken = localStorage.getItem('accessToken');
          if (JSONAccessToken) {
            const accessToken = JSON.parse(JSONAccessToken);
            token = accessToken.token;
            return cb(token);
          }
        }
        return null;
      }
    });
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });
    player.addListener('player_state_changed', state => { 
        const trackId = state.track_window && 
                        state.track_window.current_track &&
                        state.track_window.current_track.id;
        const isPlaying = !state.paused;
        const isShuffled = state.shuffle;
        const repeatMode = state.repeat_mode;
        store.dispatch(SDKUpdatePlayerState(
            trackId,
            isPlaying,
            isShuffled,
            repeatMode
        ));
    });
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      window._REACTIFY_GLOBAL_DEVICE_ID_ = device_id;
      window._REACTIFY_GLOBAL_PLAYER_INSTANCE_ = player;
      store.dispatch(confirmSDKAvailable(device_id));
    });
    if (shouldAttemptToConnect()) {
      player.connect();
    }
};

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
