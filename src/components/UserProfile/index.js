import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';

class UserProfileContainer extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return <p>User Profile here</p>
    }
}

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps,
    {
        fetchUser: ActionCreators.fetchUser
    }
)(UserProfileContainer);
