import React, { Component } from 'react';
import { connect } from 'react-redux';
import { storeToken } from '../../actions';
import { withRouter } from 'react-router';
import { getAccessToken, getAccessTokenTimestamp } from '../../selectors';

export class Auth extends Component {

    saveTokenToLocalStorage = (accessToken, timestamp) => {
        try {
            const JSONAccessToken = JSON.stringify({
                token: accessToken,
                timestamp
            });
            localStorage.setItem('accessToken', JSONAccessToken);
        } catch(err) {
            console.log(err);
        }
    }

    componentDidMount() {
        if (window.location.hash) {
            const accessToken = window.location.hash.replace(/.*access_token=([^&]+).*/, '$1');
            const timestamp = Date.now(); 
            this.props.storeToken(accessToken, timestamp);
            this.saveTokenToLocalStorage(accessToken, timestamp);
            this.props.history.push('/me');
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
    accessToken: getAccessToken(state),
    timestamp: getAccessTokenTimestamp(state)
});

export const ConnectedAuth = withRouter(connect(
    mapStateToProps,
    { storeToken }
)(Auth));
