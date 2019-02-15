import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Followers from '../Followers';
import { constructTimeline } from '../../utils';

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
        const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        const { top, left } = this.imageRef.current.getBoundingClientRect();
        // constructTimeline(this.timeline, {
        //     hasTransition,
        //     image: this.imageRef.current,
        //     title: this.titleRef.current,
        //     underline: this.underlineRef.current,
        //     container: this.followersContainerRef.current,
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
        if (prevProps.artistId !== this.props.artistId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left } = this.imageRef.current.getBoundingClientRect();
            // constructTimeline(this.timeline, {
            //     hasTransition,
            //     image: this.imageRef.current,
            //     title: this.titleRef.current,
            //     underline: this.underlineRef.current,
            //     container: this.followersContainerRef.current,
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
        const isFollowing = this.props.usersFollowedArtistIds.includes(this.props.artistId);
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
                        <Followers 
                            followerCount={this.props.followerCount} 
                            isFollowing={isFollowing}
                            showButton={true}
                            handleClick={isFollowing ? 
                                () => this.props.unfollowArtist(this.props.artistId) : 
                                () => this.props.followArtist(this.props.artistId)
                            }
                        />
                    </div>
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const artist = state.artists.artistData[ownProps.artistId];
    return {
        imageURL: artist.images.length ? artist.images[0].url : '',
        name: artist.name,
        followerCount: artist.followers.total,
        usersFollowedArtistIds: state.user.followedArtistIds,
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
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect,
        followArtist: ActionCreators.followArtist,
        unfollowArtist: ActionCreators.unfollowArtist
    }
)(ArtistProfileHeader);