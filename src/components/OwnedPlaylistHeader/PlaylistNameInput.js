import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

class PlaylistNameInput extends Component {

    static propTypes = {
        playlistName: PropTypes.string.isRequired,
        exitNameEditingState: PropTypes.func.isRequired,
        playlistId: PropTypes.string.isRequired
    };

    state = {
        editedPlaylistName: this.props.playlistName
    };

    inputRef = React.createRef();

    componentDidMount() {
        this.inputRef.current.focus();
    }

    updateEditedPlaylistName = (newName) => {
        this.setState({
            editedPlaylistName: newName
        });
    }

    handleSave = async (e) => {
        e.stopPropagation();
        const { editedPlaylistName } = this.state;
        // Wait for API response and store update before exiting the name editing state to prevent
        // flicker of previous name when rendering the non editing view
        await this.props.updatePlaylistName(editedPlaylistName, this.props.playlistId);
        this.props.exitNameEditingState();
    }

    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.editedPlaylistName}
                    ref={this.inputRef}
                    className="playlist-header__name-input"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => this.updateEditedPlaylistName(e.target.value)}
                ></input>
                <button
                    className="playlist-header__name-button"
                    onClick={this.handleSave}
                >Save</button>
            </div>
        )
    }
}

export default connect(
    undefined,
    {
        updatePlaylistName: ActionCreators.updatePlaylistName
    }
)(PlaylistNameInput);