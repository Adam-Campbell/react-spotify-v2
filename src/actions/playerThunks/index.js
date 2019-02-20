import * as actionTypes from '../../actionTypes';
import axios from 'axios';
import { SDKSelectTrack } from './SDKActions';

export const selectTrack = (deviceId, contextURI, contextId, trackURI) => async (dispatch, getState) => {
    console.log('selectTrack called')
    const state = getState();
    const SDKAvailable = state.player.SDKAvailable;
    if (SDKAvailable) {
        console.log('SDKAvailable branch hit')
        // dispatch the related SDK action
        dispatch(SDKSelectTrack(
            deviceId,
            contextURI,
            contextId,
            trackURI
        ));
    } else {
        // dispatch the related non SDK action
    }
}