import * as actionTypes from '../actionTypes';

export const storeTransitionImageRect = (imageWidth, imageHeight, imageX, imageY) => ({
    type: actionTypes.STORE_TRANSITION_IMAGE_RECT,
    payload: {
        imageWidth,
        imageHeight,
        imageX,
        imageY
    }
});

export const purgeTransitionImageRect = () => ({
    type: actionTypes.PURGE_TRANSITION_IMAGE_RECT
});