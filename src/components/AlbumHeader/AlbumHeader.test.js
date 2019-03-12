import React from 'react';
import { shallow } from 'enzyme';
import { AlbumHeader } from './AlbumHeader';
import SmartImage from '../SmartImage';
import { Link } from 'react-router-dom';

const imageRef = React.createRef();
const titleRef = React.createRef();
const underlineRef = React.createRef();
const linkContainerRef = React.createRef();

const wrapper = shallow(
    <AlbumHeader 
        albumId="dlfv54f62943syu3"
        imageRef={imageRef}
        titleRef={titleRef}
        underlineRef={underlineRef}
        linkContainerRef={linkContainerRef}
        artistName="An Artist"
        artistId="lfcp26g34byt254z"
        albumName="An Album"
        imageURL="https://cdn.com/image"
        releaseDate="2019-01-01"
    />
);


test('renders an image for the album with the correct props', () => {
    expect(wrapper.find(SmartImage)).toHaveLength(1);
    expect(wrapper.find(SmartImage).props()).toEqual({
        imageURL: 'https://cdn.com/image',
        isArtist: false,
        isFixedSize: true,
        containerRef: imageRef
    });
});

test('renders a title for the album with the correct props', () => {
    expect(wrapper.find('h1.heading')).toHaveLength(1);
    expect(wrapper.find('h1.heading').props().children).toBe('An Album');
    expect(wrapper.find('span.album-header__underline')).toHaveLength(1);
});

test('renders an artist link for the album with the correct props', () => {
    expect(wrapper.find(Link)).toHaveLength(1);
    expect(wrapper.find(Link).props().to).toBe('/artist/lfcp26g34byt254z');
    expect(wrapper.find(Link).props().children).toBe('An Artist');
});

test('render a release date with the correct value', () => {
    expect(wrapper.find('p.album-header__release-date')).toHaveLength(1);
    expect(wrapper.find('p.album-header__release-date').props().children).toBe('2019-01-01');
});
