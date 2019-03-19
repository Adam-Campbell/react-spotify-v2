import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import Category from './Category';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import Loader from '../Loader';

class CategoryContainer extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.props.fetchCategory(this.props.category);
    }

    render() {
        // const { categoryObject } = this.props;
        // if (!categoryObject || !categoryObject.fullCategoryFetched) {
        //     return null;
        // }
        const { category, timestamp, isLoading } = this.props;

        if (isLoading) {
            return <Loader />;
        }

        if (!timestamp) {
            return null;
        }
        return <Category categoryId={category} />
    }
}

const mapStateToProps = (state, ownProps) => ({
    timestamp: state.categories.timestamps[ownProps.category],
    isLoading: state.ui.loadingStatus.categoryView
});

export const ConnectedCategoryContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchCategory: ActionCreators.fetchCategory
    }
)(CategoryContainer));
