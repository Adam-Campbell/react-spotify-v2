import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Highlights from './Highlights';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import Loader from '../Loader';

class HighlightsContainer extends Component {

    componentDidMount() {
        this.props.fetchHighlights();
    }

    render() {
        const { fullHighlightsFetched, isLoading } = this.props;

        if (isLoading) {
            return <Loader />;
        }

        if (!fullHighlightsFetched) {
            return null;
        }
        return <Highlights />;
    }
}

const mapStateToProps = (state) => ({
    fullHighlightsFetched: state.highlights.fullHighlightsFetched,
    isLoading: state.ui.loadingStatus.highlightsView
});

export const ConnectedHighlightsContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchHighlights: ActionCreators.fetchHighlights
    }
)(HighlightsContainer));
