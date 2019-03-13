import React from 'react';
import { shallow } from 'enzyme';
import { CategoryHeader } from './CategoryHeader';
import SmartImage from '../SmartImage';


const imageRef = React.createRef();
const titleRef = React.createRef();
const underlineRef = React.createRef();

const wrapper = shallow(
    <CategoryHeader 
        categoryId='lco5623sr4gyu25j'
        imageRef={imageRef}
        titleRef={titleRef}
        underlineRef={underlineRef}
        name='A Category'
        imageURL='https://cdn.com/image'
    />
);

test('renders an image for the category with the correct props', () => {
    expect(wrapper.find(SmartImage)).toHaveLength(1);
    expect(wrapper.find(SmartImage).props()).toEqual({
        imageURL: 'https://cdn.com/image',
        isArtist: false,
        isFixedSize: true,
        containerRef: imageRef
    });
});

test('renders a title for the category with the correct props', () => {
    expect(wrapper.find('h1.heading')).toHaveLength(1);
    expect(wrapper.find('h1.heading').props().children).toBe('A Category');
    expect(wrapper.find('span.category-header__underline')).toHaveLength(1);
});
