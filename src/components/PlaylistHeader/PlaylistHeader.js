import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Followers from '../Followers';
import { followPlaylist, unfollowPlaylist } from '../../actions';
import { getPlaylist, getPlaylistUserFollowingStatus } from '../../selectors';
import HeaderImage from '../HeaderImage';

export const PlaylistHeader = props => (
    <header className="playlist-header">
        <HeaderImage 
            imageURL={props.imageURL}
            imageAlt={`Artwork for the ${props.playlistName} playlist`}
            imageRef={props.imageRef}
            isArtist={false}
        />
        <div className="playlist-header__text-container">
            <h1 className="heading heading--large" ref={props.titleRef}>{props.playlistName}</h1>
            <span className="playlist-header__underline" ref={props.underlineRef}></span>
            <div ref={props.followersContainerRef}>
                <p className="playlist__owner">A playlist by {props.ownerName}</p>
                <Followers 
                    followerCount={props.playlistFollowerCount}
                    isFollowing={props.isFollowing}
                    showButton={true} 
                    handleClick={props.isFollowing ? 
                        () => props.unfollowPlaylist(props.playlistId) :
                        () => props.followPlaylist(props.playlistId)
                    }
                />
            </div>
        </div>
    </header>
);

PlaylistHeader.propTypes = {
    playlistId: PropTypes.string.isRequired,
    imageRef: PropTypes.object.isRequired,
    titleRef: PropTypes.object.isRequired,
    underlineRef: PropTypes.object.isRequired,
    followersContainerRef: PropTypes.object.isRequired
};

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

export const ConnectedPlaylistHeader = connect(
    mapStateToProps,
    { followPlaylist, unfollowPlaylist }
)(PlaylistHeader);
