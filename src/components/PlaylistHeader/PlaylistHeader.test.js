import React from 'react';
import { shallow } from 'enzyme';
import { PlaylistHeader } from './PlaylistHeader';
import SmartImage from '../SmartImage';

const imageRef = React.createRef();
const titleRef = React.createRef();
const underlineRef = React.createRef();
const followersContainerRef = React.createRef();

const wrapper = shallow(
    <PlaylistHeader 
        playlistId='dofv26f483fg6v29'
        imageRef={imageRef}
        titleRef={titleRef}
        underlineRef={underlineRef}
        followersContainerRef={followersContainerRef}
        imageURL='https://cdn.com/image'
        playlistName='A Playlist'
        ownerName='A User'
        isFollowing={false}
        playlistFollowerCount={9000}
    />
);

test('renders an image for the playlist with the correct props', () => {
    expect(wrapper.find(SmartImage)).toHaveLength(1);
    expect(wrapper.find(SmartImage).props()).toEqual({
        imageURL: 'https://cdn.com/image',
        isArtist: false,
        isFixedSize: true,
        containerRef: imageRef
    });
});

test('renders a title for the playlist with the correct props', () => {
    expect(wrapper.find('h1.heading')).toHaveLength(1);
    expect(wrapper.find('h1.heading').props().children).toBe('A Playlist');
    expect(wrapper.find('span.playlist-header__underline')).toHaveLength(1);
});

test('renders a playlist owner label', () => {
    expect(wrapper.find('p.playlist__owner')).toHaveLength(1);
    expect(wrapper.find('p.playlist__owner').text()).toBe('A playlist by A User');
});