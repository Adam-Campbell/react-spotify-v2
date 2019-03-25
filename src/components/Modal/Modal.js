import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { closeModal } from '../../actions';
import { modalTypes } from '../../constants';
import UploadImageModal from '../UploadImageModal';
import AddToPlaylistModal from '../AddToPlaylistModal';
import CreatePlaylistModal from '../CreatePlaylistModal';
import { getModalInfo } from '../../selectors';

ReactModal.setAppElement('#root');

const getModalContent = (modalType, modalProps) => {
    switch (modalType) {
        case modalTypes.uploadImage:
            return <UploadImageModal {...modalProps} />;

        case modalTypes.addToPlaylist:
            return <AddToPlaylistModal {...modalProps} />;

        case modalTypes.createPlaylist:
            return <CreatePlaylistModal {...modalProps} />;

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

const mapStateToProps = state => {
    const { modalType, modalProps } = getModalInfo(state);
    return {
        modalType,
        modalProps
    };
};

export const ConnectedModal = connect(
    mapStateToProps,
    { closeModal }
)(Modal);
