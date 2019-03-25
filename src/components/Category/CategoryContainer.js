import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCategory } from '../../actions';
import Category from './Category';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import { Loader } from '../Loaders';
import { getCategoryTimestamp, getLoadingStatus } from '../../selectors';

class CategoryContainer extends Component {

    static propTypes = {
        category: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.props.fetchCategory(this.props.category);
    }

    render() {
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
    timestamp: getCategoryTimestamp(state, ownProps.category),
    isLoading: getLoadingStatus(state, 'categoryView')
});

export const ConnectedCategoryContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    { fetchCategory }
)(CategoryContainer));
