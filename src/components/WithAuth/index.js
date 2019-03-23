import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { storeToken } from '../../actions';
import { getAccessToken, getAccessTokenTimestamp } from '../../selectors';

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
            return <Redirect to="/" />
        }
    }
}

const mapStateToProps = (state) => ({
    accessToken: getAccessToken(state),
    timestamp: getAccessTokenTimestamp(state)
});

export default connect(
    mapStateToProps,
    { storeToken }
)(WithAuth);
