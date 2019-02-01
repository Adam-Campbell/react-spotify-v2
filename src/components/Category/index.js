import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';

class CategoryContainer extends Component {
    componentDidMount() {
        this.props.fetchCategoriesPlaylists(this.props.category);
    }

    render() {
        return <p>Category goes here</p>
    }
}

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps,
    {
        fetchCategoriesPlaylists: ActionCreators.fetchCategoriesPlaylists
    }
)(CategoryContainer);
