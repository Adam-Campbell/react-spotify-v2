import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHighlights } from '../../actions';
import Highlights from './Highlights';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import Loader from '../Loader';
import { getHighlightFetchedStatus, getLoadingStatus } from '../../selectors';

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
    fullHighlightsFetched: getHighlightFetchedStatus(state),
    isLoading: getLoadingStatus(state, 'highlightsView')
});

export const ConnectedHighlightsContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    { fetchHighlights }
)(HighlightsContainer));
