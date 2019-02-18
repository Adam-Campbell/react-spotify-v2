import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = props => (
    <section className="search-box">
        <p className="search-box__label">Search for an artist, album or playlist</p>
        <input
            type="text"
            className="search-box__input"
            placeholder="Start typing..."
            value={props.searchTerm}
            onChange={(e) => {
                e.persist();
                const newSearchTerm = e.target.value;
                props.updateSearchTerm(newSearchTerm);
                props.fetchSearchResults(newSearchTerm);
            }}
        ></input>
        <span className="search-box__underline"></span>
    </section>
);

SearchBox.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    updateSearchTerm: PropTypes.func.isRequired,
    fetchSearchResults: PropTypes.func.isRequired
};

export default SearchBox;