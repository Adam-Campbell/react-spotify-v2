import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Followers from '../Followers';


const PlaylistHeader = props => (
    <header className="playlist-header">
        <img className="playlist-header__image" alt="" src={props.imageURL} />
        <div className="playlist-header__text-container">
            <h1 className="heading">{props.playlistName}</h1>
            <span className="playlist-header__underline"></span>
            <p className="playlist__owner">A playlist by {props.ownerName}</p>
            <Followers followerCount={props.playlistFollowerCount} />
        </div>
    </header>
);

PlaylistHeader.propTypes = {
    playlistId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const playlist = state.playlists.playlistData[ownProps.playlistId];
    return {
        imageURL: playlist.images[0].url,
        playlistName: playlist.name,
        ownerName: playlist.owner.display_name,
        playlistFollowerCount: playlist.followers.total
    }
};

export default connect(mapStateToProps)(PlaylistHeader);

