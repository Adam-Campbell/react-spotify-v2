import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Highlights from './Highlights';
import withAuthAndUserInfo from '../withAuthAndUserInfo';

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

export const ConnectedHighlightsContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchHighlights: ActionCreators.fetchHighlights
    }
)(HighlightsContainer));
