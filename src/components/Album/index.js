import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';

class AlbumContainer extends Component {
    componentDidMount() {
        this.props.fetchAlbum(this.props.albumId);
    }

    render() {
        return <p>Artist Profile here</p>
    }
}

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps,
    {
        fetchAlbum: ActionCreators.fetchAlbum
    }
)(AlbumContainer);
