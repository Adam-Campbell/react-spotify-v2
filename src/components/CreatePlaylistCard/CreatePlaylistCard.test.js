import React from 'react';
import { shallow } from 'enzyme';
import { CreatePlaylistCard } from './';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { modalTypes } from '../../constants';

const mockedOpenModal = jest.fn();
const wrapper = shallow(
    <CreatePlaylistCard 
        openModal={mockedOpenModal}
    />
);

test('renders an icon and accompanying text inside of a card', () => {
    expect(wrapper.contains(<FontAwesomeIcon icon={faPlus} />)).toBe(true);
    expect(wrapper.contains(
        <p className="create-playlist-card__description-text">Create New Playlist</p>
    )).toBe(true);
    expect(wrapper.find('div.create-playlist-card')).toHaveLength(1);
});

test('the card calls the openModal function when clicked', () => {
    wrapper.find('div.create-playlist-card').simulate('click');
    expect(mockedOpenModal).toHaveBeenCalledTimes(1);
    expect(mockedOpenModal).toHaveBeenCalledWith(modalTypes.createPlaylist);
});

