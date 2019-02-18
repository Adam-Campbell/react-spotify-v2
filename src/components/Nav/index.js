import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    highlightsRef = React.createRef();
    meRef = React.createRef();
    fadeTween = null;

    componentDidMount() {
        // ensure that all refs have current nodes before initializing timeline
        if (
            this.logoRef.current && 
            this.searchRef.current && 
            this.highlightsRef.current &&
            this.meRef.current
        ) {
            this.fadeTween = TweenMax.staggerFrom([
                this.logoRef.current,
                this.searchRef.current,
                this.highlightsRef.current,
                this.meRef.current
            ], 0.2, {
                opacity: 0,
                delay: 0.3
            }, 0.15);
        }
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
                    <li className="nav__list-item" ref={this.highlightsRef}>
                        <NavLink to="/highlights" className="nav__link" onClick={this.props.toggleNav}>
                            <FontAwesomeIcon icon={faList} />
                            Highlights
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
        );
    }
}

export default Nav;