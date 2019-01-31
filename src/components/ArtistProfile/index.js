import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';

class ArtistProfileContainer extends Component {
    componentDidMount() {
        this.props.fetchArtist(this.props.artistId);
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
        fetchArtist: ActionCreators.fetchArtist
    }
)(ArtistProfileContainer);
