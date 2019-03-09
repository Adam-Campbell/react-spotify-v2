import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*

Takes an itemIds prop, which is an array of ids for the items that need to be rendered (in this case tracks).

If there are less than 50 items, it just renders them in the same way that a normal track collection would. 

If there are more than 50, it splits the array into subarrays of 50 or fewer items, and tracks which subarray
is currently being rendered. It exposes a method to switch to a different 'page' (different subarray). 


Alternate approach - don't store actual subarrays. Just store the current page, and possibly the total number of
pages, in component state. Then in render (which will get called anytime the current page changes in state), slice
the relevant part of the array -> (n-1) * 50 to (n-1) * 50 + 50, where n is the current page, assuming the pages
are not zero indexed. 

*/

export class PaginatedTrackCollection extends Component {

    static propTypes = {
        itemIds: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    state = {
        currentPage: 0
    };

    setPage = (newPage) => {
        this.setState({
            currentPage: newPage
        });
    }

    getArraySlice = (itemsArray, currentPage) => {
        const lowerBound = currentPage * 50;
        const upperBound = lowerBound + 50;
        return itemsArray.slice(lowerBound, upperBound);
    }

    render() {
        const { itemIds, children } = this.props;
        const { currentPage } = this.state;
        const arraySlice = this.getArraySlice(itemIds, currentPage);
        return children({
            itemIds: arraySlice,
            setPage: this.setPage,
            numberOfPages: Math.ceil(itemIds.length / 50),
            currentPage: currentPage,
        });
    }
}