import React from 'react';
import { shallow } from 'enzyme';
import { CardCollection, getImageURL } from './CardCollection';
import { collectionTypes } from '../../constants';
import { CarouselCard, Card, CreatePlaylistCard } from '../Cards';

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
    test('renders a CarouselCard for each item when isWithinCarousel is true', () => {
        const wrapper = shallow(
            <CardCollection
                itemIds={['123', '456']}
                includeCreatePlaylistCard={false}
                collectionType={collectionTypes.artists}
                isWithinCarousel={true}
                includeAdditionalLabel={false}
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
        expect(wrapper.find(CarouselCard)).toHaveLength(2);
        expect(wrapper.find(CarouselCard).at(0).props()).toMatchObject({
            linkDestination: '/artist/123',
            imageURL: 'https://cdn.com/image1',
            label: 'Artist 1',
            itemId: '123',
        });
        expect(wrapper.find(CarouselCard).at(1).props()).toMatchObject({
            linkDestination: '/artist/456',
            imageURL: 'https://cdn.com/image2',
            label: 'Artist 2',
            itemId: '456',
        });
    });
    test('renders a Card for each item when isWithinCarousel is false', () => {
        const wrapper = shallow(
            <CardCollection
                itemIds={['123', '456']}
                includeCreatePlaylistCard={false}
                collectionType={collectionTypes.artists}
                isWithinCarousel={false}
                includeAdditionalLabel={false}
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
        expect(wrapper.find(Card).at(0).props()).toMatchObject({
            linkDestination: '/artist/123',
            imageURL: 'https://cdn.com/image1',
            label: 'Artist 1',
            itemId: '123',
        });
        expect(wrapper.find(Card).at(1).props()).toMatchObject({
            linkDestination: '/artist/456',
            imageURL: 'https://cdn.com/image2',
            label: 'Artist 2',
            itemId: '456',
        });
    });
    test('renders the CreatePlaylistCard if includeCreatePlaylistCard prop is true', () => {
        const wrapper = shallow(
            <CardCollection
                itemIds={['123', '456']}
                includeCreatePlaylistCard={true}
                collectionType={collectionTypes.artists}
                isWithinCarousel={true}
                includeAdditionalLabel={false}
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