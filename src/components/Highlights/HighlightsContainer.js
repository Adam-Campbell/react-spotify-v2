import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHighlights } from '../../actions';
import Highlights from './Highlights';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import { Loader } from '../Loaders';
import { getHighlightFetchedStatus, getLoadingStatus } from '../../selectors';
import { Helmet } from 'react-helmet';

class HighlightsContainer extends Component {

    componentDidMount() {
        this.props.fetchHighlights();
    }

    render() {
        const { fullHighlightsFetched, isLoading } = this.props;

        if (isLoading) {
            return (
                <React.Fragment>
                    <Helmet>
                        <title>Highlights - React</title>
                    </Helmet>
                    <Loader />
                </React.Fragment>
            );
        }

        if (!fullHighlightsFetched) {
            return null;
        }
        return (
            <React.Fragment>
                <Helmet>
                    <title>Highlights - Reactify</title>
                </Helmet>
                <Highlights />
            </React.Fragment>
        )
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
