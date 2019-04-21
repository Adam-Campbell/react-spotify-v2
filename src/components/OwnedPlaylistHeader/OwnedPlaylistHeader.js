import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Followers from '../Followers';
import { followPlaylist, unfollowPlaylist, openModal } from '../../actions';
import PlaylistNameInput from './PlaylistNameInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { modalTypes } from '../../constants';
import Button from '../Button';
import { getPlaylist, getPlaylistUserFollowingStatus } from '../../selectors';
import HeaderImage from '../HeaderImage';

class OwnedPlaylistHeader extends Component {

    static propTypes = {
        playlistId: PropTypes.string.isRequired,
        imageRef: PropTypes.object.isRequired,
        titleRef: PropTypes.object.isRequired,
        underlineRef: PropTypes.object.isRequired,
        followersContainerRef: PropTypes.object.isRequired
    }

    state = {
        isEditingName: false,
        currentTitleWidth: 0
    };

    /**
     * Enters the name editing state causing the text input to render, and also stores the width of the h1 
     * element prior to entering editing state.
     */
    enterNameEditingState = () => {
        const { width } = this.props.titleRef.current.getBoundingClientRect();
        this.setState({
            isEditingName: true,
            currentTitleWidth: width
        });
    };

    /**
     * Exits the name editing state to render the h1 element instead of the text input.
     */
    exitNameEditingState = () => {
        this.setState({
            isEditingName: false,
            currentTitleWidth: 0
        });
    }

    /**
     * Exits the name editing state, used to allow the exiting of editing state by clicking outside of the text
     * input whilst in editing state.
     */
    handleClick = () => {
        if (this.state.isEditingName) {
            this.setState({
                isEditingName: false,
                currentTitleWidth: 0
            });
        }
    }

    /**
     * Opens the upload image modal with the required modal props. 
     */
    openUploadImageModal = () => {
        this.props.openModal(
            modalTypes.uploadImage,
            { playlistId: this.props.playlistId }
        );
    }

    render() {
        const { 
            imageURL, 
            playlistName, 
            ownerName, 
            playlistFollowerCount,
            imageRef,
            titleRef,
            underlineRef,
            followersContainerRef,
            playlistId,
            isFollowing,
            followPlaylist, 
            unfollowPlaylist
        } = this.props;
        const {
            isEditingName,
            currentTitleWidth
        } = this.state;
        return (
            <header className="playlist-header" onClick={this.handleClick}>
                <div className="playlist-header__own-playlist-inner-container">
                    <HeaderImage 
                        imageURL={imageURL}
                        imageAlt={`Artwork for the ${playlistName} playlist`}
                        imageRef={imageRef}
                        isArtist={false}
                    />
                    <Button 
                        handleClick={this.openUploadImageModal}
                        text="Upload Image"
                        additionalStyles={{ marginTop: '8px' }}
                    />
                </div>
                <div className="playlist-header__text-container">
                    {
                        isEditingName ?
                        <PlaylistNameInput 
                            playlistName={playlistName} 
                            exitNameEditingState={this.exitNameEditingState} 
                            playlistId={playlistId}
                            renderWidth={currentTitleWidth}
                        /> :
                        <React.Fragment>
                        <h1 
                            className="playlist-header__name heading heading--large" 
                            ref={titleRef}
                            onClick={this.enterNameEditingState}
                        >
                            {playlistName}
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </h1>
                        <span className="playlist-header__underline" ref={underlineRef}></span>
                        </React.Fragment>
                    }
                
                    <div ref={followersContainerRef}>
                        <p className="playlist__owner">A playlist by {ownerName}</p>
                        <Followers 
                            followerCount={playlistFollowerCount}
                            isFollowing={isFollowing}
                            showButton={true} 
                            handleClick={isFollowing ? 
                                () => unfollowPlaylist(playlistId) :
                                () => followPlaylist(playlistId)
                            }
                        />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const playlist = getPlaylist(state, ownProps.playlistId);
    return {
        imageURL: playlist.images.length ? playlist.images[0].url : '',
        playlistName: playlist.name,
        ownerName: playlist.owner.display_name,
        isFollowing: getPlaylistUserFollowingStatus(state, ownProps.playlistId),
        playlistFollowerCount: playlist.followers.total
    }
};

export const ConnectedOwnedPlaylistHeader = connect(
    mapStateToProps,
    { followPlaylist, unfollowPlaylist, openModal }
)(OwnedPlaylistHeader);
