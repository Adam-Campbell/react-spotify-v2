import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

export const Followers = props => (
    <div className="followers">
        <FontAwesomeIcon icon={faUsers} />
        <p 
            className="followers__count"
        >
            {props.followerCount} followers
        </p>
        {props.showButton && (
            <Button 
                handleClick={props.handleClick}
                text={props.isFollowing ? 'Unfollow' : 'Follow'}
                additionalStyles={{ marginLeft: '8px' }}
            />
        )}
    </div>
);

Followers.propTypes = {
    followerCount: PropTypes.number.isRequired,
    showButton: PropTypes.bool,
    isFollowing: PropTypes.bool,
    handleClick: PropTypes.func
};
