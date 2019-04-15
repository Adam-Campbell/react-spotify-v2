import * as actionTypes from '../../actionTypes';
import reducer from './transitionDataReducer';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({
        imageWidth: null,
        imageHeight: null,
        imageX: null,
        imageY: null,
        hasTransition: false
    });
});

test('handles STORE_TRANSITION_IMAGE_RECT', () => {
    expect(reducer(undefined, {
        type: actionTypes.STORE_TRANSITION_IMAGE_RECT,
        payload: {
            imageWidth: 250,
            imageHeight: 200,
            imageX: 320,
            imageY: 480
        }
    })).toEqual({
        imageWidth: 250,
        imageHeight: 200,
        imageX: 320,
        imageY: 480,
        hasTransition: true
    });
});
