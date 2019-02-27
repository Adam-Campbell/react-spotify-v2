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

/*

Additional functionality required: 

Playlist name editing
    - conditionally render h1 or text input based on state
    - add actions to send PUT request to API to update the name

Playlist cover image uploading 
    - handle in modal triggered by button in playlist header

The transition animation will need to be handled differently in this component compared to additional
header components due to the additional elements present in this component. It will probably be easier
to just handle the animations manually rather than try to adjust the constructTimeline function to handle
this case.

*/

class OwnedPlaylistHeader extends Component {

    static propTypes = {
        playlistId: PropTypes.string.isRequired
    }

    state = {
        isEditingName: false
    };

    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    containerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        const { top, left } = this.imageRef.current.getBoundingClientRect();
        // constructTimeline(this.timeline, {
        //     hasTransition,
        //     image: this.imageRef.current,
        //     title: this.titleRef.current,
        //     underline: this.underlineRef.current,
        //     container: this.containerRef.current,
        //     prevImageWidth: imageWidth,
        //     prevImageHeight: imageHeight,
        //     prevImageTop: imageY,
        //     prevImageLeft: imageX,
        //     imageTop: top,
        //     imageLeft: left
        // });
        this.props.purgeTransitionImageRect();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.playlist !== this.props.playlistId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left } = this.imageRef.current.getBoundingClientRect();
            // constructTimeline(this.timeline, {
            //     hasTransition,
            //     image: this.imageRef.current,
            //     title: this.titleRef.current,
            //     underline: this.underlineRef.current,
            //     container: this.containerRef.current,
            //     prevImageWidth: imageWidth,
            //     prevImageHeight: imageHeight,
            //     prevImageTop: imageY,
            //     prevImageLeft: imageX,
            //     imageTop: top,
            //     imageLeft: left
            // });
            this.props.purgeTransitionImageRect();
        }
    }

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
                    containerRef={this.imageRef}
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
                            ref={this.titleRef}
                            onClick={this.enterNameEditingState}
                        >
                            {playlistName}
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </h1>
                        <span className="playlist-header__underline" ref={this.underlineRef}></span>
                        </React.Fragment>
                    }
                
                    <div ref={this.containerRef}>
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
        playlistFollowerCount: playlist.followers.total,
        imageWidth: state.transitions.imageWidth,
        imageHeight: state.transitions.imageHeight,
        imageX: state.transitions.imageX,
        imageY: state.transitions.imageY,
        hasTransition: state.transitions.hasTransition
    }
};

export const ConnectedOwnedPlaylistHeader = connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect,
        followPlaylist: ActionCreators.followPlaylist,
        unfollowPlaylist: ActionCreators.unfollowPlaylist,
        openModal: ActionCreators.openModal
    }
)(OwnedPlaylistHeader);

