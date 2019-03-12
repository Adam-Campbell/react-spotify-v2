import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import { withRouter } from 'react-router';

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
    accessToken: state.accessToken.token,
    timestamp: state.accessToken.timestamp
});

export const ConnectedAuth = withRouter(connect(
    mapStateToProps,
    {
        storeToken: ActionCreators.storeToken
    }
)(Auth));