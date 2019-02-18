import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import CardCollection from '../CardCollection';
import Section from '../Section';
import { collectionTypes } from '../../constants';

class Highlights extends Component {
    componentDidMount() {
        this.props.fetchHighlights();
    }

    render() {
        if (!this.props.fullHighlightsFetched) {
            return null;
        }
        return (
            <main className="highlights">
                <Section title="New Releases">
                    <CardCollection 
                        itemIds={this.props.newReleases}
                        collectionType={collectionTypes.albums}
                    />
                </Section>
                <Section title="Featured Playlists">
                    <CardCollection 
                        itemIds={this.props.featuredPlaylists}
                        collectionType={collectionTypes.playlists}
                    />
                </Section>
                <Section title="Categories">
                    <CardCollection 
                        itemIds={this.props.categories}
                        collectionType={collectionTypes.categories}
                    />
                </Section>
            </main>
        );
    }
}

const mapStateToProps = (state) => ({
    newReleases: state.highlights.newReleases,
    featuredPlaylists: state.highlights.featuredPlaylists,
    categories: state.highlights.categories,
    fullHighlightsFetched: state.highlights.fullHighlightsFetched
});

export default connect(
    mapStateToProps,
    {
        fetchHighlights: ActionCreators.fetchHighlights
    }
)(Highlights);
