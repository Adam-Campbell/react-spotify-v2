import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Followers from '../Followers';
import * as ActionCreators from '../../actions';
import { TimelineMax } from 'gsap';

class PlaylistHeader extends Component {

    static propTypes = {
        playlistId: PropTypes.string.isRequired
    }

    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    containerRef = React.createRef();
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
        .from(this.containerRef.current, 0.4, {
            opacity: 0
        });
        this.props.purgeTransitionImageRect();
    }

    render() {
        const { imageURL, playlistName, ownerName, playlistFollowerCount } = this.props;
        return (
            <header className="playlist-header">
                <img className="playlist-header__image" alt="" src={imageURL} ref={this.imageRef} />
                <div className="playlist-header__text-container">
                    <h1 className="heading" ref={this.titleRef}>{playlistName}</h1>
                    <span className="playlist-header__underline" ref={this.underlineRef}></span>
                    <div ref={this.containerRef}>
                        <p className="playlist__owner">A playlist by {ownerName}</p>
                        <Followers followerCount={playlistFollowerCount} />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const playlist = state.playlists.playlistData[ownProps.playlistId];
    return {
        imageURL: playlist.images[0].url,
        playlistName: playlist.name,
        ownerName: playlist.owner.display_name,
        playlistFollowerCount: playlist.followers.total,
        imageWidth: state.transitions.imageWidth,
        imageHeight: state.transitions.imageHeight,
        imageX: state.transitions.imageX,
        imageY: state.transitions.imageY
    }
};

export default connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect
    }
)(PlaylistHeader);

