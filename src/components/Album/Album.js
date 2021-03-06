import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { purgeTransitionImageRect } from '../../actions';
import AlbumHeader from '../AlbumHeader';
import TrackCollection from '../TrackCollection';
import { constructTimeline } from '../../utils';
import { getAlbumTrackIds, getAlbum, getTransitionData } from '../../selectors';

export class Album extends Component {

    staticPropTypes = {
        albumId: PropTypes.string.isRequired
    };

    pageContainerRef = React.createRef();
    imageRef = React.createRef();
    titleRef = React.createRef();
    underlineRef = React.createRef();
    linkContainerRef = React.createRef();
    mainContentContainerRef = React.createRef();
    timeline = null;

    componentDidMount() {
        const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
        const { top, left, width, height } = this.imageRef.current.getBoundingClientRect();
        constructTimeline(this.timeline, {
            hasTransition,
            image: this.imageRef.current,
            title: this.titleRef.current,
            underline: this.underlineRef.current,
            headerAdditional: this.linkContainerRef.current,
            mainContent: this.mainContentContainerRef.current,
            fullPage: this.pageContainerRef.current,
            prevImageWidth: imageWidth,
            prevImageHeight: imageHeight,
            prevImageTop: imageY,
            prevImageLeft: imageX,
            currImageWidth: width,
            currImageHeight: height,
            currImageTop: top,
            currImageLeft: left
        }); 
        this.props.purgeTransitionImageRect(); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.albumId !== this.props.albumId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left, width, height } = this.imageRef.current.getBoundingClientRect();
            constructTimeline(this.timeline, {
                hasTransition,
                image: this.imageRef.current,
                title: this.titleRef.current,
                underline: this.underlineRef.current,
                headerAdditional: this.linkContainerRef.current,
                mainContent: this.mainContentContainerRef.current,
                fullPage: this.pageContainerRef.current,
                prevImageWidth: imageWidth,
                prevImageHeight: imageHeight,
                prevImageTop: imageY,
                prevImageLeft: imageX,
                currImageWidth: width,
                currImageHeight: height,
                currImageTop: top,
                currImageLeft: left
            }); 
            this.props.purgeTransitionImageRect(); 
        }
    }

    render() {
        const { albumId, albumURI, albumTrackIds } = this.props;
        return (
            <main 
                className="album"
                ref={this.pageContainerRef}
            >
                <AlbumHeader 
                    albumId={albumId}
                    imageRef={this.imageRef}
                    titleRef={this.titleRef}
                    underlineRef={this.underlineRef}
                    linkContainerRef={this.linkContainerRef} 
                />
                <section 
                    className="album__tracks-container"
                    ref={this.mainContentContainerRef}
                >
                    <TrackCollection 
                        trackIds={albumTrackIds}
                        useAlbumLayout={true}
                        contextId={albumId}
                        contextURI={albumURI}
                    />
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const { 
        imageWidth, 
        imageHeight, 
        imageX, 
        imageY, 
        hasTransition 
    } = getTransitionData(state);
    const album = getAlbum(state, ownProps.albumId);
    return {
        albumURI: album.uri,
        albumTrackIds: getAlbumTrackIds(state, ownProps.albumId),
        imageWidth,
        imageHeight,
        imageX, 
        imageY,
        hasTransition
    };
};

export default connect(
    mapStateToProps,
    { purgeTransitionImageRect }
)(Album);
