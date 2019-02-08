import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 

const AlbumHeader = props => (
    <header className="album-header">
        <img className="album-header__image" alt="" src={props.imageURL} />
        <div className="album-header__text-container">
            <h1 className="album-header__name heading">{props.albumName}</h1>
            <span className="album-header__underline"></span>
            <Link 
                to={`/artist/${props.artistId}`} 
                className="album-header__artist-link"
            >
                {props.artistName}
            </Link>
            <p className="album-header__release-date">{props.releaseDate}</p>
        </div>
    </header>
);

AlbumHeader.propTypes = {
    albumId: PropTypes.string.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const album = state.albums.albumData[ownProps.albumId];
    const artist = state.artists.artistData[album.artists[0]];
    return {
        artistName: artist.name,
        artistId: artist.id,
        albumName: album.name,
        imageURL: album.images[0].url,
        releaseDate: album.release_date
    };
};

export default connect(mapStateToProps)(AlbumHeader);