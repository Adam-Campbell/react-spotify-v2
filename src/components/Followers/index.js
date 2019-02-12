import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

const Followers = props => (
    <div className="followers">
        <FontAwesomeIcon icon={faUsers} />
        <p>{props.followerCount} followers</p>
        {props.showButton && (
            <button
                onClick={props.handleClick}
            >{props.isFollowing ? 'Unfollow' : 'Follow'}</button>
        )}
    </div>
);

Followers.propTypes = {
    followerCount: PropTypes.number.isRequired,
    showButton: PropTypes.bool,
    isFollowing: PropTypes.bool,
    handleClick: PropTypes.func
};

export default Followers;