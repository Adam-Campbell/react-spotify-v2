import React from 'react';
import { shallow } from 'enzyme';
import { UserProfileHeader } from './UserProfileHeader';

const wrapper = shallow(
    <UserProfileHeader 
        userImageURL='https://cdn.com/image'
        userDisplayName='A User'
        userFollowerCount={10}
    />
);

test('renders an image for the user', () => {
    expect(wrapper.find('img.user-profile-header__image')).toHaveLength(1);
    expect(wrapper.find('img.user-profile-header__image').props().src).toBe('https://cdn.com/image');
});

test('renders a title with the users display name', () => {
    expect(wrapper.find('h1.heading')).toHaveLength(1);
    expect(wrapper.find('h1.heading').props().children).toBe('A User');
});
