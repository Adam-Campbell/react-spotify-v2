import React from 'react';
import { shallow } from 'enzyme';
import { Followers } from './Followers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import Button from '../Button';

const mockedHandleClick = jest.fn();

test('renders an icon and a paragraph element showing the amount of followers', () => {
    const wrapper = shallow(
        <Followers 
            followerCount={9000}
            showButton={false}
            isFollowing={false}
            handleClick={mockedHandleClick}
        />
    );
    expect(wrapper.contains(<FontAwesomeIcon icon={faUsers} />)).toBe(true);
    expect(wrapper.contains(<p className="followers__count">9000 followers</p>)).toBe(true);
});

test('render a button when the showButton prop is true', () => {
    const wrapper = shallow(
        <Followers 
            followerCount={9000}
            showButton={true}
            isFollowing={false}
            handleClick={mockedHandleClick}
        />
    );
    expect(wrapper.find(Button)).toHaveLength(1);
});

test('render appropriate text in the button depending on whether the user is following', () => {
    const withoutFollowing = shallow(
        <Followers 
            followerCount={9000}
            showButton={true}
            isFollowing={false}
            handleClick={mockedHandleClick}
        />
    );
    expect(withoutFollowing.find(Button).props().text).toBe('Follow');

    const withFollowing = shallow(
        <Followers 
            followerCount={9000}
            showButton={true}
            isFollowing={true}
            handleClick={mockedHandleClick}
        />
    );
    expect(withFollowing.find(Button).props().text).toBe('Unfollow');
});

test('the handleClick method is called when the Button is clicked', () => {
    const wrapper = shallow(
        <Followers 
            followerCount={9000}
            showButton={true}
            isFollowing={false}
            handleClick={mockedHandleClick}
        />
    );
    wrapper.find(Button).shallow().find('button').simulate('click');
    expect(mockedHandleClick).toHaveBeenCalledTimes(1);
});