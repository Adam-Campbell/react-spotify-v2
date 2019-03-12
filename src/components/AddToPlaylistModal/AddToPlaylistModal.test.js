import React from 'react';
import { shallow } from 'enzyme';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import CDIcon from '../../cd-icon.jpg';
import Button from '../Button';
import { buttonThemes } from '../../constants';

const mockedAddTrackToPlaylist = jest.fn();
const mockedCloseModal = jest.fn();
const mockedPlaylistData = [
    {
        id: 'a56sf5v9d67d92fg',
        images: [{ url: 'https://cdn.com/image1' }],
        name: 'Playlist One'
    },
    {
        id: '613fd85grnji642a',
        images: [{ url: 'https://cdn.com/image2' }],
        name: 'Playlist Two'
    }
];

const mockedTrackURI = 'spotify::track:7fsg63den2913fh5';
const mockedTrackId = '7fsg63den2913fh5';

const wrapper = shallow(
    <AddToPlaylistModal 
        usersPlaylists={mockedPlaylistData}
        trackURI={mockedTrackURI}
        trackId={mockedTrackId}
        addTrackToPlaylist={mockedAddTrackToPlaylist}
        closeModal={mockedCloseModal}
    />
);

test('renders a list item, image and label for each of the users playlists', () => {
    expect(wrapper.find('li.add-to-playlist-modal__item')).toHaveLength(2);
    expect(wrapper.find('img.add-to-playlist-modal__item-image')).toHaveLength(2);
    expect(wrapper.find('p.add-to-playlist-modal__item-text')).toHaveLength(2);

});

test('the playlists image url and name are passed through to the image and labels correctly', () => {
    expect(wrapper.find('img.add-to-playlist-modal__item-image').at(0).props().src)
    .toBe('https://cdn.com/image1');

    expect(wrapper.find('p.add-to-playlist-modal__item-text').at(0).text()).toBe('Playlist One');

    expect(wrapper.find('img.add-to-playlist-modal__item-image').at(1).props().src)
    .toBe('https://cdn.com/image2');

    expect(wrapper.find('p.add-to-playlist-modal__item-text').at(1).text()).toBe('Playlist Two');
});

test('if a playlist image is not present, the CDIcon is used instead', () => {
    const withoutImageURL = shallow(
        <AddToPlaylistModal 
            usersPlaylists={[
                {
                    id: 'a56sf5v9d67d92fg',
                    images: [],
                    name: 'Playlist One'
                }
            ]}
            trackURI={mockedTrackURI}
            trackId={mockedTrackId}
            addTrackToPlaylist={mockedAddTrackToPlaylist}
            closeModal={mockedCloseModal}
        />
    );
    expect(withoutImageURL.find('img.add-to-playlist-modal__item-image').at(0).props().src)
    .toBe(CDIcon);
});

test('when a list item is clicked, the addTrackToPlaylist and closeModal functions are called', () => {
    expect(mockedAddTrackToPlaylist).not.toHaveBeenCalled();
    expect(mockedCloseModal).not.toHaveBeenCalled();
    wrapper.find('li.add-to-playlist-modal__item').at(0).simulate('click');
    expect(mockedAddTrackToPlaylist).toHaveBeenCalledTimes(1);
    expect(mockedCloseModal).toHaveBeenCalledTimes(1);
    expect(mockedAddTrackToPlaylist).toHaveBeenCalledWith(
        mockedTrackURI, 
        mockedTrackId, 
        mockedPlaylistData[0].id
    );
});

test('A Button component is rendered with the correct props passed to it', () => {
    expect(wrapper.find(Button)).toHaveLength(1);
    const buttonProps = wrapper.find(Button).props();
    expect(buttonProps).toEqual({
        text: 'Cancel',
        theme: buttonThemes.warning,
        handleClick: mockedCloseModal,
        additionalStyles: {}
    });
});
