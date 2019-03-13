import React from 'react';
import { shallow } from 'enzyme';
import { PaginationControls } from './PaginationControls';
import Button from '../Button';
import { buttonThemes } from '../../constants';

const mockedSetPage = jest.fn();

test('if numberOfPages is 1 or less, no Buttons are rendered', () => {
    const wrapper = shallow(
        <PaginationControls 
            numberOfPages={1}
            currentPage={0}
            setPage={mockedSetPage}
        />
    );
    expect(wrapper.find(Button)).toHaveLength(0);
});

test('if numberOfPages is greater than 1, a Button is rendered for each page', () => {
    const wrapper = shallow(
        <PaginationControls 
            numberOfPages={10}
            currentPage={0}
            setPage={mockedSetPage}
        />
    );
    expect(wrapper.find(Button)).toHaveLength(10);
});

test('the Button corresponding to the current page is rendered with a different buttonTheme', () => {
    const wrapper = shallow(
        <PaginationControls 
            numberOfPages={10}
            currentPage={0}
            setPage={mockedSetPage}
        />
    );
    expect(wrapper.find(Button).at(0).props().theme).toBe(buttonThemes.alternate);
    expect(wrapper.find(Button).at(1).props().theme).toBe(buttonThemes.standard);
});

test('clicking a Button calls setPage with the page number for the page that was clicked', () => {
    const wrapper = shallow(
        <PaginationControls 
            numberOfPages={10}
            currentPage={0}
            setPage={mockedSetPage}
        />
    );
    expect(mockedSetPage).not.toHaveBeenCalled();
    wrapper.find(Button).at(2).shallow().find('button').simulate('click');
    expect(mockedSetPage).toHaveBeenCalledTimes(1);
    expect(mockedSetPage).toHaveBeenCalledWith(2);
});