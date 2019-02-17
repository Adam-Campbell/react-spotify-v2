import React from 'react';
import { shallow } from 'enzyme';
import { Card } from './';
import { collectionTypes } from '../../constants';

beforeEach(() => {
    Element.prototype.getBoundingClientRect = jest.fn(() => {
        return {
            width: 200,
            height: 200,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            x: 0,
            y: 0
        }
    });
});

const historyMock = {
    push: jest.fn()
};

const mockedStoreRect = jest.fn();
const mockedFetchArtist = jest.fn();
const mockedFetchAlbum = jest.fn();
const mockedFetchPlaylist = jest.fn();
const mockedFetchCategoriesPlaylists = jest.fn();

const wrapper = shallow(
    <Card 
        storeTransitionImageRect={mockedStoreRect}
        fetchArtist={mockedFetchArtist}
        fetchAlbum={mockedFetchAlbum}
        fetchPlaylist={mockedFetchPlaylist}
        fetchCategoriesPlaylists={mockedFetchCategoriesPlaylists}
        linkDestination="/artist/artistId"
        imageURL="https://cdn.com/image"
        label="Artist name"
        collectionType={collectionTypes.artists}
    />
);

test('renders a card wrapped in a link, with an image and label matching the props passed in', () => {
    expect(wrapper.find('a.card')).toHaveLength(1);
    expect(wrapper.find('img.card__image').find({ src: 'https://cdn.com/image' })).toHaveLength(1);
    expect(wrapper.contains(<p className="card__label">Artist name</p>)).toBe(true);
});
