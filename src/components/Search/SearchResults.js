import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';
import { Card } from '../Cards';
import { collectionTypes } from '../../constants';

const getCardsArray = ({ resultsFilter, artists, albums, playlists }) => {
    switch (resultsFilter) {
        case 'ARTISTS':
            return artists.map((artist, index) => (
                <div key={`${artist.id}--${index}`}className="card-collection__card-holder">
                    <Card 
                        linkDestination={`/artist/${artist.id}`}
                        imageURL={artist.images.length ? artist.images[0].url : ''}
                        label={artist.name}
                        collectionType={collectionTypes.artists}
                        itemId={artist.id}
                    />
                </div>
            ));
        case 'ALBUMS':
            return albums.map((album, index) => (
                <div key={`${album.id}--${index}`}className="card-collection__card-holder">
                    <Card 
                        linkDestination={`/album/${album.id}`}
                        imageURL={album.images.length ? album.images[0].url : ''}
                        label={album.name}
                        collectionType={collectionTypes.albums}
                        itemId={album.id}
                        additionalLabel={album.artists[0].name}
                    />
                </div>
            ));
        case 'PLAYLISTS':
            return playlists.map((playlist, index) => (
                <div key={`${playlist.id}--${index}`}className="card-collection__card-holder">
                    <Card 
                        linkDestination={`/playlist/${playlist.id}`}
                        imageURL={playlist.images.length ? playlist.images[0].url : ''}
                        label={playlist.name}
                        collectionType={collectionTypes.playlists}
                        itemId={playlist.id}
                    />
                </div>
            ));
        default:
            return [];
    }
};

const SearchResults = props => {
    const cards = getCardsArray(props);
    return (
        <Section title="Artists" >
            <div className="card-collection">
                {
                    (props.searchTerm.length && !cards.length) ?
                    <p className="search-results__placeholder-text">There are no results to show here.</p>
                    : cards 
                }
            </div>
        </Section>
    );

}

SearchResults.propTypes = {
    resultsFilter: PropTypes.string.isRequired,
    artists: PropTypes.array.isRequired,
    albums: PropTypes.array.isRequired,
    playlists: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired
};

export default SearchResults;