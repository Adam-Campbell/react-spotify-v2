import React from 'react';
import { shallow } from 'enzyme';
import { Track, convertMsToMinSec } from './Track';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { modalTypes } from '../../constants';

describe('Track', () => {

    const mockedOpenModal = jest.fn();
    const mockedRemoveTrack = jest.fn();

    const defaultComponent = shallow(
        <Track 
            trackId="6Sy9BUbgFse0n0LPA5lwy5"
            useAlbumLayout={false}
            includeRemoveTrackButton={false}
            contextId="0Xks5v0dve8Gh2tRHIekjo"
            name="Sandstorm"
            imageURL="https://cdn.com/image"
            duration="3:45"
            trackNumber={1}
            trackURI="spotify:track:6Sy9BUbgFse0n0LPA5lwy5"
            openModal={mockedOpenModal}
            removeTrackFromPlaylist={mockedRemoveTrack}
        />
    );

    const withAlbumLayout = shallow(
        <Track 
            trackId="6Sy9BUbgFse0n0LPA5lwy5"
            useAlbumLayout={true}
            includeRemoveTrackButton={false}
            contextId="0Xks5v0dve8Gh2tRHIekjo"
            name="Sandstorm"
            imageURL="https://cdn.com/image"
            duration="3:45"
            trackNumber={1}
            trackURI="spotify:track:6Sy9BUbgFse0n0LPA5lwy5"
            openModal={mockedOpenModal}
            removeTrackFromPlaylist={mockedRemoveTrack}
        />
    );

    const withRemoveTrack = shallow(
        <Track 
            trackId="6Sy9BUbgFse0n0LPA5lwy5"
            useAlbumLayout={false}
            includeRemoveTrackButton={true}
            contextId="0Xks5v0dve8Gh2tRHIekjo"
            name="Sandstorm"
            imageURL="https://cdn.com/image"
            duration="3:45"
            trackNumber={1}
            trackURI="spotify:track:6Sy9BUbgFse0n0LPA5lwy5"
            openModal={mockedOpenModal}
            removeTrackFromPlaylist={mockedRemoveTrack}
        />
    );

    test('renders an li element for the track', () => {
        expect(defaultComponent.find('li.track')).toHaveLength(1);
    });

    test('renders elements to display the track name and duration', () => {
        expect(defaultComponent.contains(<p className="track__name">Sandstorm</p>)).toBe(true);
        expect(defaultComponent.contains(<span className="track__duration">3:45</span>)).toBe(true);
    });

    test(`when useAlbumLayout is false, renders an image thumbnail with provided image url, 
    but no track number`, () => {
        expect(defaultComponent.find('img')).toHaveLength(1);
        expect(defaultComponent.find('img').first().props().src).toBe('https://cdn.com/image');
        expect(defaultComponent.find('span.track__number')).toHaveLength(0);
    });

    test('when useAlbumLayout is true, render a track number but no image thumbnail', () => {
        expect(withAlbumLayout.find('img')).toHaveLength(0);
        expect(withAlbumLayout.find('span.track__number')).toHaveLength(1);
    });

    test('when includeRemoveTrackButton is true, it renders the remove track icon', () => {
        expect(defaultComponent.find(FontAwesomeIcon).find({ icon: faTimes })).toHaveLength(0);
        expect(withRemoveTrack.find(FontAwesomeIcon).find({ icon: faTimes })).toHaveLength(1);
    });

    test('renders an add track icon', () => {
        expect(defaultComponent.find(FontAwesomeIcon).find({ icon: faPlus })).toHaveLength(1);
    });

    test('add track icon calls the openModal function when clicked, passing the appropriate data', () => {
        expect(mockedOpenModal).toHaveBeenCalledTimes(0);
        defaultComponent.find(FontAwesomeIcon).find({ icon: faPlus })
        .simulate('click', { stopPropagation: () => {} });
        expect(mockedOpenModal).toHaveBeenCalledTimes(1);
        expect(mockedOpenModal).toHaveBeenCalledWith(modalTypes.addToPlaylist, {
            trackURI: 'spotify:track:6Sy9BUbgFse0n0LPA5lwy5',
            trackId: '6Sy9BUbgFse0n0LPA5lwy5'
        });
    });

    test(`remove track icon calls the removeTrackFromPlaylist function when clicked, 
    passing the appropriate data`, () => {
        expect(mockedRemoveTrack).toHaveBeenCalledTimes(0);
        withRemoveTrack.find(FontAwesomeIcon).find({ icon: faTimes })
        .simulate('click', { stopPropagation: () => {} });
        expect(mockedRemoveTrack).toHaveBeenCalledTimes(1);
        expect(mockedRemoveTrack).toHaveBeenCalledWith(
            'spotify:track:6Sy9BUbgFse0n0LPA5lwy5',
            '6Sy9BUbgFse0n0LPA5lwy5',
            '0Xks5v0dve8Gh2tRHIekjo'
        );
    });

});

