import React from 'react';
import PropTypes from 'prop-types';

const NavToggle = props => (
    <div className={`nav-toggle__container ${props.navIsOpen ? 'nav-open' : ''}`}>
        <div 
            className="nav-toggle"
            onClick={props.toggleNav}
        >
            <span className="nav-toggle__line nav-toggle__line--1"></span>
            <span className="nav-toggle__line nav-toggle__line--2"></span>
            <span className="nav-toggle__line nav-toggle__line--3"></span>
        </div>
    </div>
);

NavToggle.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
}

export default NavToggle;