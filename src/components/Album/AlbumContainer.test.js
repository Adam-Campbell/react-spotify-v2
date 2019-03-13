import React from 'react';
import { shallow } from 'enzyme';
import { AlbumContainer } from './AlbumContainer';
import { Album } from './Album';

const mockedFetchAlbum = jest.fn();

const wrapper = shallow(
    <AlbumContainer 
        albumId='a6sfng51r367fg5j'
        album={{ 
            id: 'a6sfng51r367fg5j',
            fullAlbumFetched: true
        }}
        fetchAlbum={mockedFetchAlbum}
    />
);

// test('renders an Album component if the complete album data is in the store', () => {
//     expect(wrapper.find(Album)).toHaveLength(1);
// });

test('does not render an Album component if the complete album data is not in the store', () => {
    const withoutAlbum = shallow(
        <AlbumContainer 
            albumId='a6sfng51r367fg5j'
            album={undefined}
            fetchAlbum={jest.fn()}
        />
    );
    expect(withoutAlbum.find(Album)).toHaveLength(0);
});

test('calls the fetchAlbum function after mounting', () => {
    expect(mockedFetchAlbum).toHaveBeenCalledTimes(1);
    expect(mockedFetchAlbum).toHaveBeenCalledWith('a6sfng51r367fg5j');
});

test('calls the fetchAlbum function when the albumId prop updates', () => {
    wrapper.setProps({ albumId: '9dwn53dgy6hf537h' });
    expect(mockedFetchAlbum).toHaveBeenCalledTimes(2);
    expect(mockedFetchAlbum).toHaveBeenCalledWith('9dwn53dgy6hf537h');
});


