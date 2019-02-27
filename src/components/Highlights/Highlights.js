import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardCollection from '../CardCollection';
import Section from '../Section';
import { collectionTypes } from '../../constants';
import { TimelineMax } from 'gsap';

class Highlights extends Component {

    pageContainerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        if (this.pageContainerRef.current) {
            this.timeline = new TimelineMax();
            this.timeline.from(this.pageContainerRef.current, 0.6, {
                opacity: 0
            });
        }
    }

    render() {
        return (
            <main className="highlights" ref={this.pageContainerRef}>
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

export default connect(mapStateToProps)(Highlights);