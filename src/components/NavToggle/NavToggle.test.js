import React from 'react';
import { shallow } from 'enzyme';
import NavToggle from './';

const mockedToggleNav = jest.fn();

const defaultWrapper = shallow(
    <NavToggle 
        navIsOpen={false}
        toggleNav={mockedToggleNav}
    />
);

const withOpenNavWrapper = shallow(
    <NavToggle 
        navIsOpen={true}
        toggleNav={mockedToggleNav}
    />
);

test('renders an element for toggling the navigation open and closed', () => {
    const toggleElement = <div 
                            className="nav-toggle"
                            onClick={mockedToggleNav}
                        >
                            <span className="nav-toggle__line nav-toggle__line--1"></span>
                            <span className="nav-toggle__line nav-toggle__line--2"></span>
                            <span className="nav-toggle__line nav-toggle__line--3"></span>
                        </div>;

    expect(defaultWrapper.contains(toggleElement)).toBe(true);
});

test('calls the toggleNav function when the element is clicked', () => {
    expect(mockedToggleNav).toHaveBeenCalledTimes(0);
    defaultWrapper.find('div.nav-toggle').simulate('click');
    expect(mockedToggleNav).toHaveBeenCalledTimes(1);
});

test('applies an additional nav-open class to outermost element when navIsOpen prop is true', () => {
    expect(defaultWrapper.find('div.nav-open')).toHaveLength(0);
    expect(withOpenNavWrapper.find('div.nav-open')).toHaveLength(1);
});
