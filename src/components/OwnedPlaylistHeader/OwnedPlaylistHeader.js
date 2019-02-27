import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Followers from '../Followers';
import * as ActionCreators from '../../actions';
import { constructTimeline } from '../../utils';
import PlaylistNameInput from './PlaylistNameInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { modalTypes } from '../../constants';
import SmartImage from '../SmartImage';

class OwnedPlaylistHeader extends Component {

    static propTypes = {
        playlistId: PropTypes.string.isRequired,
        imageRef: PropTypes.object.isRequired,
        titleRef: PropTypes.object.isRequired,
        underlineRef: PropTypes.object.isRequired,
        followersContainerRef: PropTypes.object.isRequired
    }

    state = {
        isEditingName: false
    };

    enterNameEditingState = () => {
        this.setState({
            isEditingName: true
        });
    };

    exitNameEditingState = () => {
        this.setState({
            isEditingName: false
        });
    }

    handleClick = () => {
        if (this.state.isEditingName) {
            this.setState({
                isEditingName: false
            });
        }
    }

    openUploadImageModal = () => {
        this.props.openModal(
            modalTypes.uploadImage,
            { playlistId: this.props.playlistId }
        );
    }

    render() {
        const { imageURL, playlistName, ownerName, playlistFollowerCount } = this.props;
        return (
            <header className="playlist-header" onClick={this.handleClick}>
                <SmartImage 
                    imageURL={imageURL}
                    isArtist={false}
                    isFixedSize={true}
                    containerRef={this.props.imageRef}
                />
                <button
                    className="playlist-header__image-button"
                    onClick={this.openUploadImageModal}
                >Upload Image</button>
                <div className="playlist-header__text-container">
                    {
                        this.state.isEditingName ?
                        <PlaylistNameInput 
                            playlistName={playlistName} 
                            exitNameEditingState={this.exitNameEditingState} 
                            playlistId={this.props.playlistId}
                        /> :
                        <React.Fragment>
                        <h1 
                            className="playlist-header__name heading" 
                            ref={this.props.titleRef}
                            onClick={this.enterNameEditingState}
                        >
                            {playlistName}
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </h1>
                        <span className="playlist-header__underline" ref={this.props.underlineRef}></span>
                        </React.Fragment>
                    }
                
                    <div ref={this.props.followersContainerRef}>
                        <p className="playlist__owner">A playlist by {ownerName}</p>
                        <Followers 
                            followerCount={playlistFollowerCount}
                            isFollowing={this.props.isFollowing}
                            showButton={true} 
                            handleClick={this.props.isFollowing ? 
                                () => this.props.unfollowPlaylist(this.props.playlistId) :
                                () => this.props.followPlaylist(this.props.playlistId)
                            }
                        />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const playlist = state.playlists.playlistData[ownProps.playlistId];
    return {
        imageURL: playlist.images.length ? playlist.images[0].url : '',
        playlistName: playlist.name,
        ownerName: playlist.owner.display_name,
        isFollowing: playlist.isFollowing,
        playlistFollowerCount: playlist.followers.total
    }
};

export const ConnectedOwnedPlaylistHeader = connect(
    mapStateToProps,
    {
        followPlaylist: ActionCreators.followPlaylist,
        unfollowPlaylist: ActionCreators.unfollowPlaylist,
        openModal: ActionCreators.openModal
    }
)(OwnedPlaylistHeader);
