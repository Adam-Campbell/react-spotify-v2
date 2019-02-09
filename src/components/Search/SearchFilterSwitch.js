import React from 'react';
import PropTypes from 'prop-types';

const SearchFilterSwitch = props => (
    <div className="search-filter-switch">
        <input
            className="search-filter-switch__input"
            type="radio"
            id="search-filter-switch-artists"
            name="search-filter-switch"
            value="ARTISTS"
            onChange={(e) => props.updateResultsFilter(e.target.value)}
            checked={props.resultsFilter === 'ARTISTS'}
        ></input>
        <label
            className="search-filter-switch__label search-filter-switch__label--first"
            htmlFor="search-filter-switch-artists"
        >Artists</label>
        <input
            className="search-filter-switch__input"
            type="radio"
            id="search-filter-switch-albums"
            name="search-filter-switch"
            value="ALBUMS"
            onChange={(e) => props.updateResultsFilter(e.target.value)}
            checked={props.resultsFilter === 'ALBUMS'}
        ></input>
        <label
            className="search-filter-switch__label search-filter-switch__label--middle"
            htmlFor="search-filter-switch-albums"
        >Albums</label>
        <input
            className="search-filter-switch__input"
            type="radio"
            id="search-filter-switch-playlists"
            name="search-filter-switch"
            value="PLAYLISTS"
            onChange={(e) => props.updateResultsFilter(e.target.value)}
            checked={props.resultsFilter === 'PLAYLISTS'}
        ></input>
        <label
            className="search-filter-switch__label search-filter-switch__label--last"
            htmlFor="search-filter-switch-playlists"
        >Playlists</label>
    </div>
);

SearchFilterSwitch.propTypes = {
    resultsFilter: PropTypes.string.isRequired,
    updateResultsFilter: PropTypes.func.isRequired
};

export default SearchFilterSwitch;