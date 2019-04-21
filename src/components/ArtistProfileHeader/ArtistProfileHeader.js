import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followArtist, unfollowArtist } from '../../actions';
import Followers from '../Followers';
import { getArtist, getUserFollowingArtist } from '../../selectors';
import HeaderImage from '../HeaderImage';


export const ArtistProfileHeader = props => (
    <header className="artist-profile-header">           
        <HeaderImage 
            imageURL={props.imageURL}
            imageAlt={props.name}
            imageRef={props.imageRef}
            isArtist={true}
        />
        <div className="artist-profile-header__text-container">
            <div>
                <h1 
                    className="heading heading--large" 
                    ref={props.titleRef} 
                >{props.name}</h1>
                <span className="artist-profile-header__underline" ref={props.underlineRef} ></span>
            </div>
            <div 
                className="artist-profile-header__followers-container"
                ref={props.followersContainerRef}
            >
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
    const artist = getArtist(state, ownProps.artistId);
    return {
        imageURL: artist.images.length ? artist.images[0].url : '',
        name: artist.name,
        followerCount: artist.followers.total,
        isFollowing: getUserFollowingArtist(state, ownProps.artistId)
    };
};

export const ConnectedArtistProfileHeader = connect(
    mapStateToProps,
    { followArtist, unfollowArtist }
)(ArtistProfileHeader);
