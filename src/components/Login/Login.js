import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; 
import { authURL } from '../../constants';

class Login extends Component {

    redirectToSpotifyLogin = () => {
        window.location = authURL;
    }

    render() {
        return (
            <div style={{ paddingTop: '100px' }} >
                <button
                    onClick={this.redirectToSpotifyLogin}
                >Login with Spotify</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

});

export const ConnectedLogin = connect(mapStateToProps)(Login);
