import React, { Component } from 'react';
import { connect } from 'react-redux';
import { collectionTypes } from '../../constants';
import { TimelineMax } from 'gsap';
import Carousel from '../Carousel';

class Highlights extends Component {

    pageContainerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        // if (this.pageContainerRef.current) {
        //     this.timeline = new TimelineMax();
        //     this.timeline.from(this.pageContainerRef.current, 0.6, {
        //         opacity: 0
        //     });
        // }
    }

    render() {
        const { newReleases, featuredPlaylists, categories } = this.props;
        return (
            <main className="body-content-container" ref={this.pageContainerRef}>
                <Carousel 
                    itemIds={newReleases}
                    title="New Releases"
                    collectionType={collectionTypes.albums}
                    includeCreatePlaylistCard={false}
                    includeAdditionalLabel={true}
                />
                <Carousel 
                    itemIds={featuredPlaylists}
                    title="Featured Playlists"
                    collectionType={collectionTypes.playlists}
                    includeCreatePlaylistCard={false}
                />
                <Carousel 
                    itemIds={categories}
                    title="Categories"
                    collectionType={collectionTypes.categories}
                    includeCreatePlaylistCard={false}
                />
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