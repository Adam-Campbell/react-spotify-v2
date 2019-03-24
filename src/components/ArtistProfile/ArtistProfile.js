import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { purgeTransitionImageRect } from '../../actions';
import ArtistProfileHeader from '../ArtistProfileHeader';
import Section from '../Section';
import TrackCollection from '../TrackCollection';
import { collectionTypes } from '../../constants';
import { constructTimeline } from '../../utils';
import Carousel from '../Carousel';
import { 
    getArtist,
    getArtistRelatedArtistIds, 
    getArtistTopTrackIds,
    getTransitionData,
    getSortedArtistAlbumIds
} from '../../selectors';
import { Helmet } from 'react-helmet';

// Refactor this component so that the albumIds are sorted into albums and singles in the 
// mapStateToProps function, that way the album data doesn't need to be passed into the component at all.

// const sortSinglesFromAlbums = (allIds, albumData) => {
//     const albumIds = [];
//     const singleIds = [];
//     allIds.forEach(id => {
//         if (albumData[id].album_type === 'single') {
//             singleIds.push(id);
//         } else {
//             albumIds.push(id);
//         }
//     });
//     return {
//         albumIds,
//         singleIds
//     };
// };

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
        // const { top, left, width, height } = this.imageRef.current.getBoundingClientRect();
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
        //     currImageWidth: width,
        //     currImageHeight: height,
        //     currImageTop: top,
        //     currImageLeft: left
        // }); 
        // this.props.purgeTransitionImageRect(); 
    }

    componentDidUpdate(prevProps) {
        // if (prevProps.artistId !== this.props.artistId) {
        //     const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        //     const { top, left, width, height } = this.imageRef.current.getBoundingClientRect();
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
        //         currImageWidth: width,
        //         currImageHeight: height,
        //         currImageTop: top,
        //         currImageLeft: left
        //     }); 
        //     this.props.purgeTransitionImageRect(); 
        // }
    }

    render() {
        const { 
            artistTopTrackIds, 
            artistRelatedArtistIds,  
            artistId, 
            artistName,
            artistURI,
            artistAlbumIds,
            artistSingleIds
        } = this.props;
        //const { albumIds, singleIds } = sortSinglesFromAlbums(artistsAlbumIds, albums);
        return (
            <React.Fragment>
                <Helmet>
                    <title>{artistName} - Reactify</title>
                </Helmet>
                <main 
                    className="body-content-container"
                    ref={this.pageContainerRef}
                >
                    <ArtistProfileHeader 
                        artistId={artistId}
                        imageRef={this.imageRef}
                        titleRef={this.titleRef}
                        underlineRef={this.underlineRef}
                        followersContainerRef={this.followersContainerRef}
                    />
                    <div ref={this.mainContentContainerRef}>
                        <Section title="Popular Tracks">
                            <TrackCollection 
                                trackIds={artistTopTrackIds.slice(0,5)}
                                contextURI={artistURI}
                                contextId={artistId}
                            />
                        </Section>
                        <Carousel 
                            itemIds={artistAlbumIds}
                            title="Albums"
                            collectionType={collectionTypes.albums}
                            includeCreatePlaylistCard={false}
                        />
                        <Carousel 
                            itemIds={artistSingleIds}
                            title="Singles"
                            collectionType={collectionTypes.albums}
                            includeCreatePlaylistCard={false}
                        />
                        <Carousel 
                            itemIds={artistRelatedArtistIds}
                            title="Related Artists"
                            collectionType={collectionTypes.artists}
                            includeCreatePlaylistCard={false}
                        />
                    </div>
                </main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { imageWidth, imageHeight, imageX, imageY, hasTransition } = getTransitionData(state);
    const { albumIds, singleIds } = getSortedArtistAlbumIds(state, ownProps.artistId);
    const artist = getArtist(state, ownProps.artistId);
    return {
        artistURI: artist.uri,
        artistName: artist.name,
        artistAlbumIds: albumIds,
        artistSingleIds: singleIds,
        artistTopTrackIds: getArtistTopTrackIds(state, ownProps.artistId),
        artistRelatedArtistIds: getArtistRelatedArtistIds(state, ownProps.artistId),
        imageWidth,
        imageHeight,
        imageX, 
        imageY,
        hasTransition
    }
};

export default connect(
    mapStateToProps,
    { purgeTransitionImageRect }
)(ArtistProfile);
