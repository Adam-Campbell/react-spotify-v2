import React from 'react';
import { shallow } from 'enzyme';
import SearchBox from './SearchBox';

const mockedUpdateSearchTerm = jest.fn();
const mockedFetchSearchResults = jest.fn();

const wrapper = shallow(
    <SearchBox 
        searchTerm="Foo Fighter"
        updateSearchTerm={mockedUpdateSearchTerm}
        fetchSearchResults={mockedFetchSearchResults}
    />
);

test('renders a text input using the searchTerm prop as its value', () => {
    expect(wrapper.find('input[type="text"]')).toHaveLength(1);
    expect(wrapper.find('input[type="text"]').props().value).toBe('Foo Fighter');
});

test(`calls the updateSearchTerm and fetchSearchResults functions when a change event 
occurs within the text input`, () => {
    expect(mockedUpdateSearchTerm).toHaveBeenCalledTimes(0);
    expect(mockedFetchSearchResults).toHaveBeenCalledTimes(0);
    wrapper.find('input[type="text"]').simulate('change', {
        persist: () => {},
        target: {
            value: 'Foo Fighters'
        }
    });
    expect(mockedUpdateSearchTerm).toHaveBeenCalledTimes(1);
    expect(mockedUpdateSearchTerm).toHaveBeenCalledWith('Foo Fighters');
    expect(mockedFetchSearchResults).toHaveBeenCalledTimes(1);
    expect(mockedFetchSearchResults).toHaveBeenCalledWith('Foo Fighters');
});