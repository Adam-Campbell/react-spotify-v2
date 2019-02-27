import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import SmartImage from '../SmartImage';

const AlbumHeader = props => (
    <header className="album-header">
        <SmartImage 
            imageURL={props.imageURL}
            isArtist={false}
            isFixedSize={true}
            containerRef={props.imageRef}
        />
        <div className="album-header__text-container">
            <h1 className="album-header__name heading" ref={props.titleRef} >{props.albumName}</h1>
            <span className="album-header__underline" ref={props.underlineRef} ></span>
            <div ref={props.linkContainerRef} >
                <Link 
                    to={`/artist/${props.artistId}`} 
                    className="album-header__artist-link"
                >
                    {props.artistName}
                </Link>
                <p className="album-header__release-date">{props.releaseDate}</p>
            </div>
        </div>
    </header>
);

AlbumHeader.propTypes = {
    albumId: PropTypes.string.isRequired,
    imageRef: PropTypes.object.isRequired,
    titleRef: PropTypes.object.isRequired,
    underlineRef: PropTypes.object.isRequired,
    linkContainerRef: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const album = state.albums.albumData[ownProps.albumId];
    const artist = state.artists.artistData[album.artists[0]];
    return {
        artistName: artist.name,
        artistId: artist.id,
        albumName: album.name,
        imageURL: album.images.length ? album.images[0].url : '',
        releaseDate: album.release_date
    };
};

export const ConnectedAlbumHeader = connect(mapStateToProps)(AlbumHeader);
