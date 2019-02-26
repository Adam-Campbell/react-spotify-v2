import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import * as ActionCreators from '../../actions';
import { constructTimeline } from '../../utils';
import SmartImage from '../SmartImage';

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
        const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        const { top, left } = this.imageRef.current.getBoundingClientRect();
        // constructTimeline(this.timeline, {
        //     hasTransition,
        //     image: this.imageRef.current,
        //     title: this.titleRef.current,
        //     underline: this.underlineRef.current,
        //     container: this.linkContainerRef.current,
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
        if (prevProps.albumId !== this.props.albumId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left } = this.imageRef.current.getBoundingClientRect();
            // constructTimeline(this.timeline, {
            //     hasTransition,
            //     image: this.imageRef.current,
            //     title: this.titleRef.current,
            //     underline: this.underlineRef.current,
            //     container: this.linkContainerRef.current,
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

    render() {
        const { imageURL, albumName, artistId, artistName, releaseDate } = this.props;
        return (
            <header className="album-header">
                <SmartImage 
                    imageURL={imageURL}
                    isArtist={false}
                    isFixedSize={true}
                    containerRef={this.imageRef}
                />
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
        imageURL: album.images.length ? album.images[0].url : '',
        releaseDate: album.release_date,
        imageWidth: state.transitions.imageWidth,
        imageHeight: state.transitions.imageHeight,
        imageX: state.transitions.imageX,
        imageY: state.transitions.imageY,
        hasTransition: state.transitions.hasTransition
    };
};

export default connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect
    }
)(AlbumHeader);