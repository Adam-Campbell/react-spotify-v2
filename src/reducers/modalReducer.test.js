import * as actionTypes from '../actionTypes';
import reducer from './modalReducer';
import { modalTypes } from '../constants';

test('returns the default state', () => {
    expect(reducer(undefined, {})).toEqual({
        modalType: null,
        modalProps: {}
    });
});

test('handles OPEN_MODAL', () => {
    expect(reducer(undefined, {
        type: actionTypes.OPEN_MODAL,
        payload: {
            modalType: modalTypes.uploadImage,
            modalProps: { foo: 'bar' }
        }
    })).toEqual({
        modalType: modalTypes.uploadImage,
        modalProps: { foo: 'bar' }
    });
});

test('handles CLOSE_MODAL', () => {
    expect(reducer({
        modalType: modalTypes.uploadImage,
        modalProps: { foo: 'bar' }
    }, {
        type: actionTypes.CLOSE_MODAL
    })).toEqual({
        modalType: null,
        modalProps: {}
    });
});
