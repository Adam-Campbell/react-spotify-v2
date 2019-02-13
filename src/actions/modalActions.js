import * as actionTypes from '../actionTypes';

export const openModal = (modalType, modalProps) => ({
    type: actionTypes.OPEN_MODAL,
    payload: {
        modalType,
        modalProps
    }
});

export const closeModal = () => ({
    type: actionTypes.CLOSE_MODAL
});
