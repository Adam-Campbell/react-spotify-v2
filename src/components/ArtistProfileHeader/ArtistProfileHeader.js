import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Followers from '../Followers';
import { constructTimeline } from '../../utils';
import SmartImage from '../SmartImage';

class ArtistProfileHeader extends Component {

    static propTypes = {
        artistId: PropTypes.string.isRequired,
        imageRef: PropTypes.object.isRequired,
        titleRef: PropTypes.object.isRequired,
        underlineRef: PropTypes.object.isRequired,
        followersContainerRef: PropTypes.object.isRequired
    };

    render() {
        const isFollowing = this.props.usersFollowedArtistIds.includes(this.props.artistId);
        return (
            <header className="artist-profile-header">
                
                <SmartImage 
                    imageURL={this.props.imageURL}
                    isArtist={true}
                    isFixedSize={true}
                    containerRef={this.props.imageRef}
                />
                <div className="artist-profile-header__text-container">
                    <h1 
                        className="artist-profile-header__name heading" 
                        ref={this.props.titleRef} 
                    >{this.props.name}</h1>
                    <span className="artist-profile-header__underline" ref={this.props.underlineRef} ></span>
                    <div ref={this.props.followersContainerRef}>
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

export const ConnectedArtistProfileHeader = connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect,
        followArtist: ActionCreators.followArtist,
        unfollowArtist: ActionCreators.unfollowArtist
    }
)(ArtistProfileHeader);