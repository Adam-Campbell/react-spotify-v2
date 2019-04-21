import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Search from './Search';
import { debounce } from 'lodash';
import { TimelineMax } from 'gsap';
import withAuthAndUserInfo from '../withAuthAndUserInfo';

class SearchContainer extends Component {

    constructor(props) {
        super(props);
        this.debouncedFetchSearchResults = debounce(this.fetchSearchResults, 200).bind(this);
        this.underlineRef = React.createRef();
        this.timeline = null;
        this.state = {
            artists: [],
            albums: [],
            playlists: [],
            searchTerm: '',
            resultsFilter: 'ARTISTS'
        }
    }

    componentDidMount() {
        if (this.underlineRef.current) {
            this.timeline = new TimelineMax();
            this.timeline.from(this.underlineRef.current, 0.6, {
                scaleX: 0
            });
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
        if (searchTerm === '') {
            this.setState({
                artists: [],
                albums: [],
                playlists: []
            });
        } else {
            const { token, market } = this.props;
            const response = await axios.get(
                `https://api.spotify.com/v1/search?q=${searchTerm}&type=artist,album,playlist&market=${market}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            /*
                Grab the most up to date search term out of local state and ensure that it matches the search
                term that these results belong to, and only update state with the new results if they match. 
                This ensures that if one of the requests takes longer and returns after a different request that
                was actually made afterwards, the results from the older request will not overwrite the results
                from the newer request. 
            */
            const currentSearchTerm = this.state.searchTerm;
            if (searchTerm === currentSearchTerm) {
                this.setState({
                    artists: response.data.artists.items,
                    albums: response.data.albums.items,
                    playlists: response.data.playlists.items
                });
            }
        }
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
                underlineRef={this.underlineRef}
            />
        )
    }
}

const mapStateToProps = (state) => ({
    token: state.accessToken.token,
    market: state.user.country
});

export const ConnectedSearchContainer = withAuthAndUserInfo(connect(mapStateToProps)(SearchContainer));
