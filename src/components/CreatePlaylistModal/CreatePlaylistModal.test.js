import React from 'react';
import { shallow } from 'enzyme';
import { CreatePlaylistModal } from './CreatePlaylistModal';
import Button from '../Button';

const mockedCreatePlaylist = jest.fn();
const mockedCloseModal = jest.fn();

const wrapper = shallow(
    <CreatePlaylistModal 
        createPlaylist={mockedCreatePlaylist}
        closeModal={mockedCloseModal}
    />
);

test('renders a title for the modal', () => {
    expect(wrapper.find('h1.heading')).toHaveLength(1);
    expect(wrapper.find('h1.heading').props().children).toBe('Create A Playlist');
});

test('renders an input to enter the new playlist name', () => {
    expect(wrapper.find('input.create-playlist-modal__input')).toHaveLength(1);
    expect(wrapper.find('input.create-playlist-modal__input').props().type).toBe('text')
});

test(`The value of the text input matches the playlistName property in state, and the playlistName
property in state updates when the text input updates`, () => {
    expect(wrapper.state().playlistName).toBe('');
    expect(wrapper.find('input.create-playlist-modal__input').props().value).toBe('');

    wrapper.find('input.create-playlist-modal__input').simulate('change', { target: { value: 'A' } });

    expect(wrapper.state().playlistName).toBe('A');
    expect(wrapper.find('input.create-playlist-modal__input').props().value).toBe('A');
});

test('renders a button to create the playlist, which calls createPlaylist and closeModal when clicked', () => {
    const createPlaylistButtonWrapper = wrapper.find(Button).find({ text: 'Create Playlist' });
    expect(createPlaylistButtonWrapper).toHaveLength(1);
    createPlaylistButtonWrapper.shallow().find('button').simulate('click');
    expect(mockedCreatePlaylist).toHaveBeenCalledTimes(1);
    expect(mockedCreatePlaylist).toHaveBeenCalledWith(wrapper.state().playlistName);
    expect(mockedCloseModal).toHaveBeenCalledTimes(1);
});

test('renders a button to close the modal, which calls closeModal when clicked', () => {
    const closeModalButtonWrapper = wrapper.find(Button).find({ text: 'Cancel' });
    expect(closeModalButtonWrapper).toHaveLength(1);
    closeModalButtonWrapper.shallow().find('button').simulate('click');
    expect(mockedCloseModal).toHaveBeenCalledTimes(2);
});