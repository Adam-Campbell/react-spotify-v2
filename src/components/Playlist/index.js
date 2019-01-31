import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';

class PlaylistContainer extends Component {
    componentDidMount() {
        this.props.fetchPlaylist(this.props.playlistId);
    }

    render() {
        return <p>Playlist goes here</p>
    }
}

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps,
    {
        fetchPlaylist: ActionCreators.fetchPlaylist
    }
)(PlaylistContainer);
