import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPlaylist, closeModal } from '../../actions';
import Button from '../Button';
import { buttonThemes } from '../../constants';

export class CreatePlaylistModal extends Component {

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
        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
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
                    text="Create Playlist"
                    handleClick={() => {
                        this.props.createPlaylist(this.state.playlistName)
                        this.props.closeModal();
                    }}
                />
                <Button 
                    text="Cancel"
                    theme={buttonThemes.warning}
                    handleClick={this.props.closeModal}
                    additionalStyles={{ marginLeft: '8px' }}
                />
            </div>
        );
    }
}

export const ConnectedCreatePlaylistModal = connect(
    undefined, 
    { createPlaylist, closeModal }
)(CreatePlaylistModal);
