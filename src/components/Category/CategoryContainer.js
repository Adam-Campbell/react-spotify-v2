import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import Category from './Category';

class CategoryContainer extends Component {
    componentDidMount() {
        this.props.fetchCategory(this.props.category);
    }

    render() {
        const { categoryObject } = this.props;
        if (!categoryObject || !categoryObject.fullCategoryFetched) {
            return null;
        }
        return <Category categoryId={this.props.category} />
    }
}

const mapStateToProps = (state, ownProps) => ({
    categoryObject: state.categories.categoryData[ownProps.category]
});

export const ConnectedCategoryContainer = connect(
    mapStateToProps,
    {
        fetchCategory: ActionCreators.fetchCategory
    }
)(CategoryContainer);
