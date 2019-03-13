import React from 'react';
import { connect } from 'react-redux';
import Followers from '../Followers';

export const UserProfileHeader = props => (
    <header className="user-profile-header">
        <img className="user-profile-header__image" alt="" src={props.userImageURL} />
        <h1 className="heading heading--large">{props.userDisplayName}</h1>
        <Followers followerCount={props.userFollowerCount} />
    </header>
);

const mapStateToProps = state => ({
    userImageURL: state.user.images.length ? state.user.images[0].url : '',
    userDisplayName: state.user.display_name,
    userFollowerCount: state.user.followers.total
});

export const ConnectedUserProfileHeader = connect(mapStateToProps)(UserProfileHeader);