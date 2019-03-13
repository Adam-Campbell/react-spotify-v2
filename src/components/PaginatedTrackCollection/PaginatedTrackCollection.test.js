import React from 'react';
import { shallow } from 'enzyme';
import { PaginatedTrackCollection, getArraySlice } from './PaginatedTrackCollection';

const itemsArr = new Array(23).fill(0).map((el, index) => index.toString());

describe('getArraySlice', () => {
    test(`returns the correct subarray from itemsArray according to the values of 
    currentPage and itemsPerPage`, () => {
        expect(getArraySlice(itemsArr, 0, 5)).toEqual(['0', '1', '2', '3', '4']);
        expect(getArraySlice(itemsArr, 1, 10)).toEqual(
            ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
        );
    });
    test(`returns a subarray smaller than the value of itemsPerPage for the last page if necessary`, () => {
        expect(getArraySlice(itemsArr, 4, 5)).toEqual(['20', '21', '22']);
    });
});

describe('PaginatedTrackCollection', () => {
    const mockedRenderProp = jest.fn();
    const wrapper = shallow(
        <PaginatedTrackCollection
            itemIds={itemsArr}
            itemsPerPage={5}
        > 
            {({ itemIds, numberOfPages, currentPage }) => mockedRenderProp(itemIds, numberOfPages, currentPage)}
        </PaginatedTrackCollection>
    );
    test('sends the correct slice of the array through to the render prop according', () => {
        expect(mockedRenderProp).toHaveBeenLastCalledWith(
            ['0', '1', '2', '3', '4'],
            5,
            0
        );
    });
    test('calling setPage results in updated arguments being passed to the render prop', () => {
        wrapper.instance().setPage(1);
        expect(mockedRenderProp).toHaveBeenLastCalledWith(
            ['5', '6', '7', '8', '9'],
            5, 
            1
        );
    });
    test('altering the itemsPerPage prop alters the size of the array slice passed to the render prop', () => {
        const withMoreItemsPerPage = shallow(
            <PaginatedTrackCollection
                itemIds={itemsArr}
                itemsPerPage={10}
            > 
                {({ itemIds, numberOfPages, currentPage }) => mockedRenderProp(itemIds, numberOfPages, currentPage)}
            </PaginatedTrackCollection>
        );
        expect(mockedRenderProp).toHaveBeenLastCalledWith(
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            3,
            0
        );
    });
});