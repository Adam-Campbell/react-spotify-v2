import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { authURL } from '../../constants';
import * as ActionCreators from '../../actions';

class WithAuth extends Component {
    saveTokenToLocalStorage = (accessToken) => {
        try {
            const JSONAccessToken = JSON.stringify(accessToken);
            localStorage.setItem('accessToken', JSONAccessToken);
        } catch(err) {
            console.log(err);
        }
    }

    checkForAccessToken = () => {
        if (window.location.hash) {
            const accessToken = window.location.hash.replace(/.*access_token=([^&]+).*/, '$1');
            const timestamp = Date.now();  
            this.props.storeToken(accessToken, timestamp);
            this.saveTokenToLocalStorage({
                token: accessToken,
                timestamp: timestamp
            });
            return true;
        } else if (this.props.accessToken) {
            return true;
        }
        else {
            return false;
        }
    };

    render() {
        const { children } = this.props;
        if (this.checkForAccessToken()) {
            return children();
        } else {
            window.location = authURL;
            return null;
        }
    }
}

const mapStateToProps = (state) => ({
    accessToken: state.accessToken.token
});

export default connect(
    mapStateToProps,
    {
        storeToken: ActionCreators.storeToken
    }
)(WithAuth);