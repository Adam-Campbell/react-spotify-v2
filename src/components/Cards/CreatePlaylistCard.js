import React from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import InteractionValidator from './InteractionValidator';
import { modalTypes } from '../../constants';
import './createPlaylistCard.scss';

const createPlaylistCard = ({ openModal }) => (
    <InteractionValidator>
        {(ivProps) => {
            const handleInteractionEnd = () => {
                if (ivProps.isActive) {
                    openModal(modalTypes.createPlaylist);
                }
                ivProps.endInteraction();
            };
            return (
                <div className="create-playlist-card__outer">
                    <div 
                        className={`create-playlist-card ${ivProps.isActive ? 'active' : ''}`} 
                        onMouseDown={ivProps.startMouseInteraction}
                        onMouseMove={ivProps.updateMouseInteraction}
                        onMouseUp={handleInteractionEnd}
                        onMouseLeave={ivProps.endInteraction}
                        onTouchStart={ivProps.startTouchInteraction}
                        onTouchMove={ivProps.updateTouchInteraction}
                        onTouchEnd={handleInteractionEnd}
                        onClick={(e) => e.preventDefault()}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <p className="create-playlist-card__description-text">Create New Playlist</p>
                    </div>
                </div>
            );
        }}
    </InteractionValidator>
);

export const CreatePlaylistCard = connect(
    undefined,
    { openModal: ActionCreators.openModal }
)(createPlaylistCard);