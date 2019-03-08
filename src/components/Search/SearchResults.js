import React from 'react';
import PropTypes from 'prop-types';
import Section from '../Section';
import { Card } from '../Cards';
import { collectionTypes } from '../../constants';

const SearchResults = props => {
    switch (props.resultsFilter) {
        case 'ARTISTS':
            return (
                <Section title="Artists" >
                    <div className="card-collection">
                        {props.artists.map((artist, index) => (
                            <div key={`${artist.id}--${index}`}className="card-collection__card-holder">
                                <Card 
                                    linkDestination={`/artist/${artist.id}`}
                                    imageURL={artist.images.length ? artist.images[0].url : ''}
                                    label={artist.name}
                                    collectionType={collectionTypes.artists}
                                    itemId={artist.id}
                                />
                            </div>
                        ))}
                    </div>
                </Section>
            );

        case 'ALBUMS':
            return (
                <Section title="Albums" >
                    <div className="card-collection">
                        {props.albums.map((album, index) => (
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
                        ))}
                    </div>
                </Section>
            );

        case 'PLAYLISTS':
            return (
                <Section title="Playlists" >
                    <div className="card-collection">
                        {props.playlists.map((playlist, index) => (
                            <div key={`${playlist.id}--${index}`}className="card-collection__card-holder">
                                <Card 
                                    linkDestination={`/playlist/${playlist.id}`}
                                    imageURL={playlist.images.length ? playlist.images[0].url : ''}
                                    label={playlist.name}
                                    collectionType={collectionTypes.playlists}
                                    itemId={playlist.id}
                                />
                            </div>
                        ))}
                    </div>
                </Section>
            );

        default:
            return (
                <Section title="Artists" >
                    <div className="card-collection">
                        {props.artists.map((artist, index) => (
                            <div key={`${artist.id}--${index}`}className="card-collection__card-holder">
                                <Card 
                                    linkDestination={`/artist/${artist.id}`}
                                    imageURL={artist.images.length ? artist.images[0].url : ''}
                                    label={artist.name}
                                    collectionType={collectionTypes.artists}
                                    itemId={artist.id}
                                />
                            </div>
                        ))}
                    </div>
                </Section>
            );
    }
}

SearchResults.propTypes = {
    resultsFilter: PropTypes.string.isRequired,
    artists: PropTypes.array.isRequired,
    albums: PropTypes.array.isRequired,
    playlists: PropTypes.array.isRequired
};

export default SearchResults;