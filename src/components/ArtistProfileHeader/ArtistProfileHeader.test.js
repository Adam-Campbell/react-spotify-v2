import React from 'react';
import { shallow } from 'enzyme';
import { ArtistProfileHeader } from './ArtistProfileHeader';
import SmartImage from '../SmartImage';
import Followers from '../Followers';

const imageRef = React.createRef();
const titleRef = React.createRef();
const underlineRef = React.createRef();
const followersContainerRef = React.createRef();
const mockedFollowArtist = jest.fn();
const mockedUnfollowArtist = jest.fn();

const wrapper = shallow(
    <ArtistProfileHeader 
        artistId='df95134fjoi52j6m'
        imageRef={imageRef}
        titleRef={titleRef}
        underlineRef={underlineRef}
        followersContainerRef={followersContainerRef}
        imageURL='https://cdn.com/image'
        name='An Artist'
        followerCount={9000}
        isFollowing={true}
        followArtist={mockedFollowArtist}
        unfollowArtist={mockedUnfollowArtist}
    />
);

test('renders an image for the artist with the correct props', () => {
    expect(wrapper.find(SmartImage)).toHaveLength(1);
    expect(wrapper.find(SmartImage).props()).toEqual({
       imageURL: 'https://cdn.com/image',
       isArtist: true,
       isFixedSize: true,
       containerRef: imageRef 
    });
});

test('renders a title for the artist with the correct props', () => {
    expect(wrapper.find('h1.heading')).toHaveLength(1);
    expect(wrapper.find('h1.heading').props().children).toBe('An Artist');
    expect(wrapper.find('span.artist-profile-header__underline')).toHaveLength(1);
});

test('renders a Followers component with the correct props', () => {
    expect(wrapper.find(Followers)).toHaveLength(1);
    expect(wrapper.find(Followers).props().followerCount).toBe(9000);
    expect(wrapper.find(Followers).props().isFollowing).toBe(true);
});