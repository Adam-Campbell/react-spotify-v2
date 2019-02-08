import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Followers from '../Followers';

const ArtistProfileHeader = props => (
    <header className="artist-profile-header">
        <img className="artist-profile-header__image" alt="" src={props.imageURL} />
        <div className="artist-profile-header__text-container">
            <h1 className="artist-profile-header__name heading">{props.name}</h1>
            <span className="artist-profile-header__underline"></span>
            <Followers followerCount={props.followerCount} />
        </div>
    </header>
);

ArtistProfileHeader.propTypes = {
    artistId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const artist = state.artists.artistData[ownProps.artistId];
    return {
        imageURL: artist.images[0].url,
        name: artist.name,
        followerCount: artist.followers.total
    };
};

export default connect(mapStateToProps)(ArtistProfileHeader);