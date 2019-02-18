import React from 'react';
import { shallow } from 'enzyme';
import Nav from './';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

const mockedToggleNav = jest.fn();

const wrapper = shallow (
    <Nav toggleNav={mockedToggleNav} />
);

test('renders links going to the Search, Highlights and Me routes', () => {
    const searchLink = <NavLink to="/search" className="nav__link" onClick={mockedToggleNav}>
                            <FontAwesomeIcon icon={faSearch} />
                            Search
                        </NavLink>;

    const highlightsLink = <NavLink to="/highlights" className="nav__link" onClick={mockedToggleNav}>
                                <FontAwesomeIcon icon={faList} />
                                Highlights
                            </NavLink>;

    const meLink = <NavLink to="/me" className="nav__link" onClick={mockedToggleNav}>
                        <FontAwesomeIcon icon={faUser} />
                        Me
                    </NavLink>;

    expect(wrapper.contains(searchLink)).toBe(true);
    expect(wrapper.contains(highlightsLink)).toBe(true);
    expect(wrapper.contains(meLink)).toBe(true);
});

test('renders the Spotify logo', () => {
    expect(wrapper.contains(<FontAwesomeIcon icon={faSpotify} />)).toBe(true);
});

test('calls the toggleNav function passed as a prop when a link is clicked', () => {
    expect(mockedToggleNav).toHaveBeenCalledTimes(0);
    wrapper.find(NavLink).first().simulate('click');
    expect(mockedToggleNav).toHaveBeenCalledTimes(1);
});