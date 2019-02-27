import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import CardCollection from '../CardCollection';
import Section from '../Section';
import { collectionTypes } from '../../constants';
import Highlights from './Highlights';

class HighlightsContainer extends Component {

    componentDidMount() {
        this.props.fetchHighlights();
    }

    render() {
        if (!this.props.fullHighlightsFetched) {
            return null;
        }
        return <Highlights />;
    }
}

const mapStateToProps = (state) => ({
    fullHighlightsFetched: state.highlights.fullHighlightsFetched
});

export const ConnectedHighlightsContainer = connect(
    mapStateToProps,
    {
        fetchHighlights: ActionCreators.fetchHighlights
    }
)(HighlightsContainer);
