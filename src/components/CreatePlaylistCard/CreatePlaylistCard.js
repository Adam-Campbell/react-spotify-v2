import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { modalTypes } from '../../constants';

export const CreatePlaylistCard = props => (
    <div className="card-collection__card-holder">
        <div 
            className="create-playlist-card" 
            onClick={() => props.openModal(modalTypes.createPlaylist)}
        >
            <FontAwesomeIcon icon={faPlus} />
            <p className="create-playlist-card__description-text">Create New Playlist</p>
        </div>
    </div>
);

export const ConnectedCreatePlaylistCard = connect(
    undefined,
    { openModal: ActionCreators.openModal }
)(CreatePlaylistCard);