import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { TweenMax } from 'gsap';

class Nav extends Component {

    static propTypes = {
        toggleNav: PropTypes.func.isRequired
    }

    logoRef = React.createRef();
    searchRef = React.createRef();
    browseRef = React.createRef();
    meRef = React.createRef();
    fadeTween = null;

    componentDidMount() {
        this.fadeTween = TweenMax.staggerFrom([
            this.logoRef.current,
            this.searchRef.current,
            this.browseRef.current,
            this.meRef.current
        ], 0.2, {
            opacity: 0,
            delay: 0.3
        }, 0.15);
    }

    render() {
        return (
            <React.Fragment>
                <div className="nav__logo-container" ref={this.logoRef}>
                    <FontAwesomeIcon icon={faSpotify} />
                </div>
                <nav className="nav">
                    <ul className="nav__list">
                    <li className="nav__list-item" ref={this.searchRef}>
                        <NavLink to="/search" className="nav__link" onClick={this.props.toggleNav}>
                            <FontAwesomeIcon icon={faSearch} />
                            Search
                        </NavLink>
                    </li>
                    <li className="nav__list-item" ref={this.browseRef}>
                        <NavLink to="/browse" className="nav__link" onClick={this.props.toggleNav}>
                        <FontAwesomeIcon icon={faList} />
                            Browse
                        </NavLink>
                    </li>
                    <li className="nav__list-item" ref={this.meRef}>
                        <NavLink to="/me" className="nav__link" onClick={this.props.toggleNav}>
                            <FontAwesomeIcon icon={faUser} />
                            Me
                        </NavLink>
                    </li>
                    </ul>
                </nav>
            </React.Fragment>
        )
    }
}


export default Nav;