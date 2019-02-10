import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import * as ActionCreators from '../../actions';
import { TimelineMax } from 'gsap';

class AlbumHeader extends Component {

    static propTypes = {
        albumId: PropTypes.string.isRequired
    }

    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    linkContainerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        if (this.props.imageWidth === null) return;

        const { imageWidth, imageHeight, imageX, imageY } = this.props;
        const { width, height, top, left } = this.imageRef.current.getBoundingClientRect();
        const deltaX = imageX - left;
        const deltaY = imageY - top;
        this.timeline = new TimelineMax();
        this.timeline.from(this.imageRef.current, 0.3, {
            width: imageWidth,
            height: imageHeight,
            x: deltaX,
            y: deltaY
        })
        .from(this.titleRef.current, 0.4, {
            opacity: 0
        })
        .from(this.underlineRef.current, 0.6, {
            scaleX: 0
        })
        .from(this.linkContainerRef.current, 0.4, {
            opacity: 0
        });
        this.props.purgeTransitionImageRect();
    }

    render() {
        const { imageURL, albumName, artistId, artistName, releaseDate } = this.props;
        return (
            <header className="album-header">
                <img className="album-header__image" alt="" src={imageURL} ref={this.imageRef} />
                <div className="album-header__text-container">
                    <h1 className="album-header__name heading" ref={this.titleRef} >{albumName}</h1>
                    <span className="album-header__underline" ref={this.underlineRef} ></span>
                    <div ref={this.linkContainerRef} >
                        <Link 
                            to={`/artist/${artistId}`} 
                            className="album-header__artist-link"
                        >
                            {artistName}
                        </Link>
                        <p className="album-header__release-date">{releaseDate}</p>
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const album = state.albums.albumData[ownProps.albumId];
    const artist = state.artists.artistData[album.artists[0]];
    return {
        artistName: artist.name,
        artistId: artist.id,
        albumName: album.name,
        imageURL: album.images[0].url,
        releaseDate: album.release_date,
        imageWidth: state.transitions.imageWidth,
        imageHeight: state.transitions.imageHeight,
        imageX: state.transitions.imageX,
        imageY: state.transitions.imageY
    };
};

export default connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect
    }
)(AlbumHeader);