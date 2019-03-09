import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Button from '../Button';
import { buttonThemes } from '../../constants';

const AddToPlaylistModal = props => (
    <div className="add-to-playlist-modal">
        <h1 className="heading">Add to playlist</h1>
        <ul className="add-to-playlist-modal__list">
            {props.usersPlaylists.map(playlist => (
                <li 
                    className="add-to-playlist-modal__item"
                    key={playlist.id}
                    onClick={() => {
                        props.addTrackToPlaylist(props.trackURI, props.trackId, playlist.id);
                        props.closeModal();
                    }}
                >
                  <img 
                    className="add-to-playlist-modal__item-image" 
                    src={playlist.images.length ? playlist.images[0].url : ''} 
                    alt="" 
                />  
                  <p className="add-to-playlist-modal__item-text">{playlist.name}</p>
                </li>
            ))}
        </ul>
        <Button 
            text="Cancel"
            handleClick={props.closeModal}
            theme={buttonThemes.warning}
        />
    </div>
);

AddToPlaylistModal.propTypes = {
    trackURI: PropTypes.string.isRequired,
    trackId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    usersPlaylists: state.user.playlistIds.map(playlistId => state.playlists.playlistData[playlistId])
});

export const ConnectedAddToPlaylistModal = connect(
    mapStateToProps,
    { 
        addTrackToPlaylist: ActionCreators.addTrackToPlaylist,
        closeModal: ActionCreators.closeModal 
    }
)(AddToPlaylistModal);