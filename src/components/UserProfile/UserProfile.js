import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import UserProfileHeader from '../UserProfileHeader';
import TrackCollection from '../TrackCollection';
import Section from '../Section';
import CardCollection from '../CardCollection';
import { collectionTypes } from '../../constants';
import { TimelineMax } from 'gsap';
import Carousel from '../Carousel';

class UserProfileContainer extends Component {

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
        if (!this.props.userId) {
            return null;
        }
        return (
            <main className="user-profile" ref={this.pageContainerRef}>
                <UserProfileHeader />
                <Section title="Recently Played Tracks">
                    <TrackCollection 
                        trackIds={this.props.recentTracksIds.slice(0,5)}
                        contextURI={this.props.userURI}
                        contextId={this.props.userId}
                    />
                </Section>
                <Carousel 
                    itemIds={this.props.topArtistsIds}
                    title="Your Top Artists"
                    collectionType={collectionTypes.artists}
                    includeCreatePlaylistCard={false}
                />
                <Carousel 
                    itemIds={this.props.playlistIds}
                    title="Your Playlists"
                    collectionType={collectionTypes.playlists}
                    includeCreatePlaylistCard={true}
                />
            </main>
        );
    }
    
}

const mapStateToProps = (state) => ({
    userId: state.user.id,
    userURI: state.user.uri,
    recentTracksIds: state.user.recentTracksIds,
    topArtistsIds: state.user.topArtistsIds,
    playlistIds: state.user.playlistIds
});

export const ConnectedUserProfile =  connect(
    mapStateToProps,
    {
        fetchUser: ActionCreators.fetchUser
    }
)(UserProfileContainer);
