import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';

class ArtistProfileContainer extends Component {
    componentDidMount() {
        this.props.fetchHighlights();
    }

    render() {
        return <p>Highlights go here</p>
    }
}

const mapStateToProps = (state) => ({

});

export default connect(
    mapStateToProps,
    {
        fetchHighlights: ActionCreators.fetchHighlights
    }
)(ArtistProfileContainer);
