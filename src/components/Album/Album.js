import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import AlbumHeader from '../AlbumHeader';
import TrackCollection from '../TrackCollection';
import { constructTimeline } from '../../utils';

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
        const { top, left } = this.imageRef.current.getBoundingClientRect();
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
            imageTop: top,
            imageLeft: left
        }); 
        this.props.purgeTransitionImageRect(); 
    }

    componentDidUpdate(prevProps) {
        if (prevProps.albumId !== this.props.albumId) {
            const { imageWidth, imageHeight, imageX, imageY, hasTransition } = this.props;
            const { top, left } = this.imageRef.current.getBoundingClientRect();
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
                imageTop: top,
                imageLeft: left
            }); 
            this.props.purgeTransitionImageRect(); 
        }
    }

    render() {
        const { tracks, id, uri } = this.props.album;
        return (
            <main 
                className="album"
                ref={this.pageContainerRef}
            >
                <AlbumHeader 
                    albumId={this.props.albumId}
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
                        trackIds={tracks}
                        useAlbumLayout={true}
                        contextId={id}
                        contextURI={uri}
                    />
                </section>
            </main>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    album: state.albums.albumData[ownProps.albumId],
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
)(Album);
