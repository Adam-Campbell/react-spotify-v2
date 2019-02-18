import React from 'react';
import { shallow } from 'enzyme';
import { CardCollection, getImageURL } from './';
import { collectionTypes } from '../../constants';
import CreatePlaylistCard from '../CreatePlaylistCard';
import Card from '../Card';

describe('getImageUrl', () => {
    test('returns the image url if it is present', () => {
        expect(getImageURL(
            { images: [{ url: 'https://cdn.com/image' }] },
            collectionTypes.artists
        )).toBe('https://cdn.com/image');
    });
    test('if no image url is present, returns an empty string', () => {
        expect(getImageURL(
            { images: [] },
            collectionTypes.artists
        )).toBe('');
    });
    test('alters the lookup path for the image url collection type is categories', () => {
        expect(getImageURL(
            { icons: [{ url: 'https://cdn.com/image' }] },
            collectionTypes.categories
        )).toBe('https://cdn.com/image');
    });
});

describe('CardCollection', () => {
    test('renders a card for each item passed as a prop', () => {
        const wrapper = shallow(
            <CardCollection
                itemIds={['123', '456']}
                includeCreatePlaylistCard={false}
                collectionType={collectionTypes.artists}
                URLPath='/artist/'
                items={[
                    {
                        id: '123',
                        images: [ { url: 'https://cdn.com/image1' } ],
                        name: 'Artist 1'
                    },
                    {
                        id: '456',
                        images: [ { url: 'https://cdn.com/image2' } ],
                        name: 'Artist 2'
                    }
                ]}
            />
        );
        expect(wrapper.find(Card)).toHaveLength(2);
        expect(wrapper.find(CreatePlaylistCard)).toHaveLength(0);
    });
    test('renders the CreatePlaylistCard if includeCreatePlaylistCard prop is true', () => {
        const wrapper = shallow(
            <CardCollection
                itemIds={['123', '456']}
                includeCreatePlaylistCard={true}
                collectionType={collectionTypes.artists}
                URLPath='/artist/'
                items={[
                    {
                        id: '123',
                        images: [ { url: 'https://cdn.com/image1' } ],
                        name: 'Artist 1'
                    },
                    {
                        id: '456',
                        images: [ { url: 'https://cdn.com/image2' } ],
                        name: 'Artist 2'
                    }
                ]}
            />
        );
        expect(wrapper.find(CreatePlaylistCard)).toHaveLength(1);
    });
});