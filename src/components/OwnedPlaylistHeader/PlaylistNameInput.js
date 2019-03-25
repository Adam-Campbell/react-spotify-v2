import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updatePlaylistName } from '../../actions';
import Button from '../Button';

class PlaylistNameInput extends Component {

    static propTypes = {
        playlistName: PropTypes.string.isRequired,
        exitNameEditingState: PropTypes.func.isRequired,
        playlistId: PropTypes.string.isRequired,
        renderWidth: PropTypes.number
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

    /**
     * Calls the exitNameEditingState callback to cause the parent component to go back to rendering the h1
     * element rather than this component. The callback is only called after awaiting the updatePlaylistName
     * response - this prevents any 'flicker' of the previous name occurring if the parent component renders
     * the h1 element before the store can update with the new name.
     */
    handleSave = async (e) => {
        e.stopPropagation();
        const { editedPlaylistName } = this.state;
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
                    style={{ width: this.props.renderWidth }}
                ></input>
                <Button 
                    text="Save"
                    handleClick={this.handleSave}
                />
            </div>
        )
    }
}

export default connect(
    undefined,
    { updatePlaylistName }
)(PlaylistNameInput);
