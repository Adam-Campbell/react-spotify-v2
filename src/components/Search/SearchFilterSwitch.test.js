import React from 'react';
import { shallow } from 'enzyme';
import SearchFilterSwitch from './SearchFilterSwitch';

const mockedUpdateResultsFilter = jest.fn();

const defaultWrapper = shallow(
    <SearchFilterSwitch 
        resultsFilter="ARTISTS"
        updateResultsFilter={mockedUpdateResultsFilter}
    />
);

const withAlbumsWrapper = shallow(
    <SearchFilterSwitch 
        resultsFilter="ALBUMS"
        updateResultsFilter={mockedUpdateResultsFilter}
    />
);


test('renders a radio input for each search filter', () => {
    const inputs = defaultWrapper.find('input[type="radio"]');
    expect(inputs.findWhere(n => n.props().value === 'ARTISTS')).toHaveLength(1);
    expect(inputs.findWhere(n => n.props().value === 'ALBUMS')).toHaveLength(1);
    expect(inputs.findWhere(n => n.props().value === 'PLAYLISTS')).toHaveLength(1);
});

test('the checked property on each radio input reflects the curent search filter value', () => {
    const defaultInputs = defaultWrapper.find('input[type="radio"]');
    expect(defaultInputs.findWhere(n => n.props().value === 'ARTISTS').props().checked).toBe(true);
    expect(defaultInputs.findWhere(n => n.props().value === 'ALBUMS').props().checked).toBe(false);

    const withAlbumsInputs = withAlbumsWrapper.find('input[type="radio"]');
    expect(withAlbumsInputs.findWhere(n => n.props().value === 'ARTISTS').props().checked).toBe(false);
    expect(withAlbumsInputs.findWhere(n => n.props().value === 'ALBUMS').props().checked).toBe(true);
});

test('when a change event occurs in a radio input, the updateResultsFilter function is called', () => {
    expect(mockedUpdateResultsFilter).toHaveBeenCalledTimes(0);

    defaultWrapper.find('input[type="radio"]').findWhere(n => n.props().value === 'ALBUMS')
    .simulate('change', { target: { value: 'ALBUMS' } });

    expect(mockedUpdateResultsFilter).toHaveBeenCalledTimes(1);
    expect(mockedUpdateResultsFilter).toHaveBeenCalledWith('ALBUMS');
});