import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import * as ActionCreators from '../../actions';
import { modalTypes } from '../../constants';
import UploadImageModal from '../UploadImageModal';

ReactModal.setAppElement('#root');

const getModalContent = (modalType, modalProps) => {
    switch (modalType) {
        case modalTypes.uploadImage:
            return <UploadImageModal {...modalProps} />;

        default:
            return null;
    }
}

const Modal = props => (
    <ReactModal
        isOpen={props.modalType ? true : false}
        className="modal__content-container"
        overlayClassName="modal__overlay"
        shouldCloseOnEscape={true}
        onRequestClose={props.closeModal}
    >
        {getModalContent(props.modalType, props.modalProps)}
    </ReactModal>
)

const mapStateToProps = state => ({
    modalType: state.modal.modalType,
    modalProps: state.modal.modalProps
});

export default connect(
    mapStateToProps,
    {
        closeModal: ActionCreators.closeModal
    }
)(Modal)