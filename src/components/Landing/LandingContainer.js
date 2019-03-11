import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authURL } from '../../constants';
import Landing from './Landing';
import { Redirect } from 'react-router-dom';

class LandingContainer extends Component {

    redirectToSpotifyLogin = () => {
        window.location = authURL;
    }

    render() {

        const { token, timestamp } = this.props;
        const isLoggedIn = token && Date.now() - timestamp < 3600000;

        if (isLoggedIn) {
            return (
                <Redirect to="/me" />
            )
        } else {
            return (
                <Landing handleLoginRedirect={this.redirectToSpotifyLogin} />
            );
        }
    }
}

const mapStateToProps = (state) => ({
    token: state.accessToken.token,
    timestamp: state.accessToken.timestamp
});

export const ConnectedLandingContainer = connect(mapStateToProps)(LandingContainer);
