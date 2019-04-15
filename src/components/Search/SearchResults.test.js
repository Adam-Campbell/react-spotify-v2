import React from 'react';
import { shallow } from 'enzyme';
import SearchResults from './SearchResults';
import { collectionTypes } from '../../constants';
import Section from '../Section';
import { Card } from '../Cards';

const artists = [
    {
        id: 'a1',
        name: 'Artist 1',
        images: [{ url: 'https://cdn.com/image1' }]
    },
    {
        id: 'b2',
        name: 'Artist 2',
        images: [{ url: 'https://cdn.com/image2' }]
    }
];

const albums = [
    {
        id: 'c3',
        name: 'Album 1',
        images: [],
        artists: [{ name: 'Artist 1' }]
    },
    {
        id: 'df',
        name: 'Album 2',
        images: [{ url: 'https://cdn.com/image4' }],
        artists: [{ name: 'Artist 2' }]
    }
];


const withArtistsWrapper = shallow(
    <SearchResults 
        resultsFilter={collectionTypes.artists}
        artists={artists}
        albums={albums}
        playlists={[]}
        searchTerm="A search"
    />
);

const withAlbumsWrapper = shallow(
    <SearchResults 
        resultsFilter={collectionTypes.albums}
        artists={artists}
        albums={albums}
        playlists={[]}
        searchTerm="A search"
    />
);


test('renders the relevant collection of results corresponding to the value of the resultsFilter prop', () => {
    expect(withArtistsWrapper.find(Section).props().title).toBe('Artists');
    expect(withAlbumsWrapper.find(Section).props().title).toBe('Albums');
})


test('renders a card for each item in the collection currently being rendered', () => {
    const cards = withArtistsWrapper.find(Card);
    expect(cards).toHaveLength(2);
    expect(cards.at(0).props().itemId).toBe('a1');
    expect(cards.at(0).props().label).toBe('Artist 1');
    expect(cards.at(0).props().imageURL).toBe('https://cdn.com/image1');
});

test(`if any items in the collection don't have an image, defaults to passing an empty string
as the image url`, () => {
    expect(withAlbumsWrapper.find(Card).at(0).props().imageURL).toBe('');
});

