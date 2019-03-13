import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const getArraySlice = (itemsArray, currentPage, itemsPerPage) => {
    const lowerBound = currentPage * itemsPerPage;
    const upperBound = lowerBound + itemsPerPage;
    return itemsArray.slice(lowerBound, upperBound);
};


export class PaginatedTrackCollection extends Component {

    static propTypes = {
        itemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        itemsPerPage: PropTypes.number
    };

    static defaultProps = {
        itemsPerPage: 50
    };

    state = {
        currentPage: 0
    };

    setPage = (newPage) => {
        this.setState({
            currentPage: newPage
        });
    }

    render() {
        const { itemIds, itemsPerPage, children } = this.props;
        const { currentPage } = this.state;
        const arraySlice = getArraySlice(itemIds, currentPage, itemsPerPage);
        return children({
            itemIds: arraySlice,
            setPage: this.setPage,
            numberOfPages: Math.ceil(itemIds.length / itemsPerPage),
            currentPage: currentPage,
        });
    }
}