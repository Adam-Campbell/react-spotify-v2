import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Button from '../Button';

class CreatePlaylistModal extends Component {

    state = {
        playlistName: ''
    }

    inputRef = React.createRef();

    updatePlaylistName = (newPlaylistName) => {
        this.setState({
            playlistName: newPlaylistName
        });
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }

    render() {
        return (
            <div className="create-playlist-modal">
                <h1 className="heading">Create A Playlist</h1>
                <input
                    type="text"
                    ref={this.inputRef}
                    className="create-playlist-modal__input"
                    placeholder="Name your new playlist"
                    value={this.state.playlistName}
                    onChange={(e) => this.updatePlaylistName(e.target.value)}
                ></input>
                <Button 
                    text="CreatePlaylist"
                    handleClick={() => {
                        this.props.createPlaylist(this.state.playlistName)
                        this.props.closeModal();
                    }}
                />
                <Button 
                    text="Cancel"
                    isWarning={true}
                    handleClick={this.props.closeModal}
                    additionalStyles={{ marginLeft: '8px' }}
                />
            </div>
        );
    }
}


/*

<button 
                    className="create-playlist-modal__create-button"
                    onClick={() => {
                        this.props.createPlaylist(this.state.playlistName)
                        this.props.closeModal();
                    }}
                >Create Playlist</button>
                <button 
                    className="create-playlist-modal__cancel-button" 
                    onClick={this.props.closeModal}
                >Cancel</button>

*/

export const ConnectedCreatePlaylistModal = connect(
    undefined, 
    {
        createPlaylist: ActionCreators.createPlaylist,
        closeModal: ActionCreators.closeModal
    }
)(CreatePlaylistModal);