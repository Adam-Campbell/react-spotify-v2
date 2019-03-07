import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authURL } from '../../constants';
import { Redirect } from 'react-router-dom';
import * as ActionCreators from '../../actions';

class WithAuth extends Component {
    hasValidToken = () => {
        const { accessToken, timestamp } = this.props;
        return (accessToken || Date.now() - timestamp < 3600000);
    }

    render() {
        const { children } = this.props;
        if (this.hasValidToken()) {
            return children()
        } else {
            return <Redirect to="/login" />
        }
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.accessToken.token,
    timestamp: state.accessToken.timestamp
});

export default connect(
    mapStateToProps,
    {
        storeToken: ActionCreators.storeToken
    }
)(WithAuth);
