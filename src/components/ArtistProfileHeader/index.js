import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Followers from '../Followers';
import { TimelineMax } from 'gsap';

class ArtistProfileHeader extends Component {

    static propTypes = {
        artistId: PropTypes.string.isRequired
    }

    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    followersContainerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        //if there is no transition information just return early
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
        .from(this.followersContainerRef.current, 0.4, {
            opacity: 0
        });
        
        this.props.purgeTransitionImageRect();
    }

    render() {
        return (
            <header className="artist-profile-header">
                <img 
                    className="artist-profile-header__image" 
                    alt="" 
                    src={this.props.imageURL}
                    ref={this.imageRef} 
                />
                <div className="artist-profile-header__text-container">
                    <h1 
                        className="artist-profile-header__name heading" 
                        ref={this.titleRef} 
                    >{this.props.name}</h1>
                    <span className="artist-profile-header__underline" ref={this.underlineRef} ></span>
                    <div ref={this.followersContainerRef}>
                        <Followers followerCount={this.props.followerCount} />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const artist = state.artists.artistData[ownProps.artistId];
    return {
        imageURL: artist.images[0].url,
        name: artist.name,
        followerCount: artist.followers.total,
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
)(ArtistProfileHeader);