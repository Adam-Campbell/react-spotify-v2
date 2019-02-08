import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = props => (
    <Link to={props.linkDestination} className="card">
        <div className="card__image-container">
            <img className="card__image" alt="" src={props.imageURL} />
        </div>
        <p className="card__label">{props.label}</p>
    </Link>
);

Card.propTypes = {
    linkDestination: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default Card;
