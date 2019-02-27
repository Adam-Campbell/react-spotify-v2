import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

class UploadImageModal extends Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
        this.reader = new FileReader();
        this.reader.addEventListener('load', this.handleUploadImage);
    }

    static propTypes = {
        playlistId: PropTypes.string.isRequired
    };

    checkForFile = () => {
        const imageFile = this.fileInput.current.files[0];
        if (imageFile) {
            this.reader.readAsDataURL(imageFile);
        }
    }

    handleUploadImage = async () => {
        let originalImageData = this.reader.result;
        const alteredImageData = await this.convertToJPEG(originalImageData);
        this.props.updatePlaylistImage(alteredImageData, this.props.playlistId);
        this.props.closeModal();
    }

    /**
     * Takes the uploaded image and adjusts it to meet the requirements of the image upload API endpoint
     * before returning it.
     * 
     */
    convertToJPEG = (imageData) => {
        /*
            Rendering the image to a canvas (only in memory not in the DOM), solves two different problems.
            Firstly, the API endpoint only accepts JPEG, so rendering to a canvas and then re-exporting the
            data from there provides an opportunity to convert PNG images to JPEG. 

            Additionaly, the API endpoint enforces a maximum upload size of 256KB. It also shrinks all images
            that are passed to it, such that the longer length of the image (width or height) is at most 300px,
            and the shorter length is kept in proportion to the longer length. By sizing the images down to 
            that size before uploading them to the endpoint, we can make it very unlikely that the image
            will fail to meet the file size restrictions.
        */
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => {
                // get the width and height, find which is longer, and scale lengths down if needed.
                let width = image.width;
                let height = image.height;
                const longerLength = Math.max(width, height);
                if (longerLength > 300) {
                    const scaleDownRatio = 300 / longerLength;
                    width = width * scaleDownRatio;
                    height = height * scaleDownRatio;
                }
                // now create canvas, add image to it and export toDataURL
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(image, 0, 0, width, height);
                const newImageData = canvas.toDataURL('image/jpeg');
                resolve(newImageData);
            });
            image.src = imageData;
        })
    }

    render() {
        return (
            <div className="upload-image-modal">
                <h1 className="heading">Cover Image Upload</h1>
                <p>Click the button below to upload a new cover image for your playlist</p>
                <input
                    type="file"
                    name="upload-image-input"
                    id="upload-image-input"
                    className="upload-image-modal__input"
                    onChange={this.checkForFile}
                    ref={this.fileInput}
                ></input>
                <label 
                    htmlFor="upload-image-input"
                    className="upload-image-modal__label"
                >
                    <FontAwesomeIcon icon={faUpload}/>
                    <span>Choose an image</span>
                </label>
                <button
                    className="upload-image-modal__button"
                    onClick={this.props.closeModal}
                >Cancel</button>
            </div>
        )
    }
}

export const ConnectedUploadImageModal = connect(
    undefined, 
    {
        closeModal: ActionCreators.closeModal,
        updatePlaylistImage: ActionCreators.updatePlaylistImage
    }
)(UploadImageModal);