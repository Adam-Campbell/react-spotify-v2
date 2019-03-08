import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import ArtistProfileHeader from '../ArtistProfileHeader';
import Section from '../Section';
import TrackCollection from '../TrackCollection';
import CardCollection from '../CardCollection';
import { collectionTypes } from '../../constants';
import { constructTimeline } from '../../utils';
import Carousel from '../Carousel';

const sortSinglesFromAlbums = (allIds, albumData) => {
    const albumIds = [];
    const singleIds = [];
    allIds.forEach(id => {
        if (albumData[id].album_type === 'single') {
            singleIds.push(id);
        } else {
            albumIds.push(id);
        }
    });
    return {
        albumIds,
        singleIds
    };
};

const _sortSinglesFromAlbums = (allIds, albumData) => {
    allIds.reduce((acc, id) => {
        return albumData[id].album_type === 'single' ?
                {
                    albumIds: [ ...acc.albumIds ],
                    singleIds: [ ...acc.singleIds, id ]
                } :
                {
                    albumIds: [ ...acc.albumIds, id ],
                    singleIds: [ ...acc.singleIds ]
                }
    }, {
      albumIds: [],
      singleIds: []  
    });
};

class ArtistProfile extends Component {

    static propTypes = {
        artistId: PropTypes.string.isRequired
    };

    pageContainerRef = React.createRef();
    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    followersContainerRef = React.createRef();
    mainContentContainerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        // const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        // const { top, left } = this.imageRef.current.getBoundingClientRect();
        // constructTimeline(this.timeline, {
        //     hasTransition,
        //     image: this.imageRef.current,
        //     title: this.titleRef.current,
        //     underline: this.underlineRef.current,
        //     headerAdditional: this.followersContainerRef.current,
        //     mainContent: this.mainContentContainerRef.current,
        //     fullPage: this.pageContainerRef.current,
        //     prevImageWidth: imageWidth,
        //     prevImageHeight: imageHeight,
        //     prevImageTop: imageY,
        //     prevImageLeft: imageX,
        //     imageTop: top,
        //     imageLeft: left
        // }); 
        // this.props.purgeTransitionImageRect(); 
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.artistId !== this.props.artistId) {
        //     const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        //     const { top, left } = this.imageRef.current.getBoundingClientRect();
        //     constructTimeline(this.timeline, {
        //         hasTransition,
        //         image: this.imageRef.current,
        //         title: this.titleRef.current,
        //         underline: this.underlineRef.current,
        //         headerAdditional: this.followersContainerRef.current,
        //         mainContent: this.mainContentContainerRef.current,
        //         fullPage: this.pageContainerRef.current,
        //         prevImageWidth: imageWidth,
        //         prevImageHeight: imageHeight,
        //         prevImageTop: imageY,
        //         prevImageLeft: imageX,
        //         imageTop: top,
        //         imageLeft: left
        //     }); 
        //     this.props.purgeTransitionImageRect(); 
        // }
    }

    render() {
        const { topTrackIds, relatedArtistIds, uri } = this.props.artist;
        const { albumIds, singleIds } = sortSinglesFromAlbums(
                                            this.props.artist.albumIds, 
                                            this.props.albums
                                        );
        return (
            <main 
                className="body-content-container"
                ref={this.pageContainerRef}
            >
                <ArtistProfileHeader 
                    artistId={this.props.artistId}
                    imageRef={this.imageRef}
                    titleRef={this.titleRef}
                    underlineRef={this.underlineRef}
                    followersContainerRef={this.followersContainerRef}
                />
                <div ref={this.mainContentContainerRef}>
                    <Section title="Popular Tracks">
                        <TrackCollection 
                            trackIds={topTrackIds.slice(0,5)}
                            contextURI={uri}
                            contextId={this.props.artistId}
                        />
                    </Section>
                    <Carousel 
                        itemIds={albumIds}
                        title="Albums"
                        collectionType={collectionTypes.albums}
                        includeCreatePlaylistCard={false}
                    />
                    <Carousel 
                        itemIds={singleIds}
                        title="Singles"
                        collectionType={collectionTypes.albums}
                        includeCreatePlaylistCard={false}
                    />
                    <Carousel 
                        itemIds={relatedArtistIds}
                        title="Related Artists"
                        collectionType={collectionTypes.artists}
                        includeCreatePlaylistCard={false}
                    />
                </div>
            </main>
        );
    }
}

/*

<Section title="Music">
                        <CardCollection 
                            itemIds={albumIds}
                            collectionType={collectionTypes.albums}
                        />
                    </Section>

                    <Section title="Related Artists">
                        <CardCollection 
                            itemIds={relatedArtistIds}
                            collectionType={collectionTypes.artists}
                        />
                    </Section>


*/

const mapStateToProps = (state, ownProps) => ({
    artist: state.artists.artistData[ownProps.artistId],
    albums: state.albums.albumData,
    imageWidth: state.transitions.imageWidth,
    imageHeight: state.transitions.imageHeight,
    imageX: state.transitions.imageX, 
    imageY: state.transitions.imageY,
    hasTransition: state.transitions.hasTransition
});

export default connect(
    mapStateToProps,
    {
        purgeTransitionImageRect: ActionCreators.purgeTransitionImageRect
    }
)(ArtistProfile);
