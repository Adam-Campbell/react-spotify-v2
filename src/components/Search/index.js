import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as ActionCreators from '../../actions';
import Search from './Search';
import { debounce } from 'lodash';
import { layer } from '@fortawesome/fontawesome-svg-core';

class SearchContainer extends Component {

    constructor(props) {
        super(props);
        this.debouncedFetchSearchResults = debounce(this.fetchSearchResults, 200).bind(this);
        this.state = {
            artists: [],
            albums: [],
            playlists: [],
            searchTerm: '',
            resultsFilter: 'ARTISTS'
        }
    }

    updateSearchTerm = (newSearchTerm) => {
        this.setState({
            searchTerm: newSearchTerm
        });
    }

    updateResultsFilter = (newFilterSetting) => {
        this.setState({
            resultsFilter: newFilterSetting
        });
    }

    fetchSearchResults = async (searchTerm) => {
        const { token, market } = this.props;
        const response = await axios.get(
            `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist,album,playlist&market=${market}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        this.setState({
            artists: response.data.artists.items,
            albums: response.data.albums.items,
            playlists: response.data.playlists.items
        })
    }

    render() {
        return (
            <Search 
                searchTerm={this.state.searchTerm}
                artists={this.state.artists}
                albums={this.state.albums}
                playlists={this.state.playlists}
                resultsFilter={this.state.resultsFilter}
                updateSearchTerm={this.updateSearchTerm}
                updateResultsFilter={this.updateResultsFilter}
                fetchSearchResults={this.debouncedFetchSearchResults}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.accessToken.token,
    market: state.user.country
});

export default connect(mapStateToProps)(SearchContainer);