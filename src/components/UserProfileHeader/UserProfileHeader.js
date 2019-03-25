import React from 'react';
import { connect } from 'react-redux';
import UserIcon from '../../user-icon.jpg';
import Followers from '../Followers';
import { getUserProfile } from '../../selectors';

export const UserProfileHeader = props => (
    <header className="user-profile-header">
        <img className="user-profile-header__image" alt="" src={props.userImageURL} />
        <h1 className="heading heading--large">{props.userDisplayName}</h1>
        <Followers followerCount={props.userFollowerCount} />
    </header>
);

const mapStateToProps = state => {
    const user = getUserProfile(state);
    return {
        userImageURL: user.images.length ? user.images[0].url : UserIcon,
        userDisplayName: user.display_name,
        userFollowerCount: user.followers.total
    };
};

export const ConnectedUserProfileHeader = connect(mapStateToProps)(UserProfileHeader);