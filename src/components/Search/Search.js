import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import SearchFilterSwitch from './SearchFilterSwitch';

const Search = props => (
    <main className="body-content-container">
        <SearchBox 
            searchTerm={props.searchTerm}
            updateSearchTerm={props.updateSearchTerm}
            fetchSearchResults={props.fetchSearchResults}
            underlineRef={props.underlineRef}
        />
        <SearchFilterSwitch 
            resultsFilter={props.resultsFilter}
            updateResultsFilter={props.updateResultsFilter}
        />
        <SearchResults 
            resultsFilter={props.resultsFilter}
            artists={props.artists}
            albums={props.albums}
            playlists={props.playlists}
            searchTerm={props.searchTerm}
        />
    </main>
);

Search.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    artists: PropTypes.array.isRequired,
    albums: PropTypes.array.isRequired,
    playlists: PropTypes.array.isRequired,
    resultsFilter: PropTypes.string.isRequired,
    updateSearchTerm: PropTypes.func.isRequired,
    updateResultsFilter: PropTypes.func.isRequired,
    fetchSearchResults: PropTypes.func.isRequired,
    underlineRef: PropTypes.object.isRequired
}

export default Search;