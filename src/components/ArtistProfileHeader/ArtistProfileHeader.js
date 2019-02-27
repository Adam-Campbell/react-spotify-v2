import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Followers from '../Followers';
import SmartImage from '../SmartImage';

const ArtistProfileHeader = props => (
    <header className="artist-profile-header">         
        <SmartImage 
            imageURL={props.imageURL}
            isArtist={true}
            isFixedSize={true}
            containerRef={props.imageRef}
        />
        <div className="artist-profile-header__text-container">
            <h1 
                className="artist-profile-header__name heading" 
                ref={props.titleRef} 
            >{props.name}</h1>
            <span className="artist-profile-header__underline" ref={props.underlineRef} ></span>
            <div ref={props.followersContainerRef}>
                <Followers 
                    followerCount={props.followerCount} 
                    isFollowing={props.isFollowing}
                    showButton={true}
                    handleClick={props.isFollowing ? 
                        () => props.unfollowArtist(props.artistId) : 
                        () => props.followArtist(props.artistId)
                    }
                />
            </div>
        </div>
    </header>
);

ArtistProfileHeader.propTypes = {
    artistId: PropTypes.string.isRequired,
    imageRef: PropTypes.object.isRequired,
    titleRef: PropTypes.object.isRequired,
    underlineRef: PropTypes.object.isRequired,
    followersContainerRef: PropTypes.object.isRequired 
};

const mapStateToProps = (state, ownProps) => {
    const artist = state.artists.artistData[ownProps.artistId];
    return {
        imageURL: artist.images.length ? artist.images[0].url : '',
        name: artist.name,
        followerCount: artist.followers.total,
        isFollowing: state.user.followedArtistIds.includes(ownProps.artistId)
    };
};

export const ConnectedArtistProfileHeader = connect(
    mapStateToProps,
    {
        followArtist: ActionCreators.followArtist,
        unfollowArtist: ActionCreators.unfollowArtist
    }
)(ArtistProfileHeader);
