import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import UserProfileHeader from '../UserProfileHeader';
import TrackCollection from '../TrackCollection';
import Section from '../Section';
import { collectionTypes } from '../../constants';
import { TimelineMax } from 'gsap';
import Carousel from '../Carousel';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import Loader from '../Loader';

class UserProfileContainer extends Component {

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
        
        const { 
            userId, 
            userURI, 
            recentTrackIds, 
            topArtistIds, 
            playlistIds, 
            isLoading,
            hasFetched 
        } = this.props;

        if (isLoading) {
            return <Loader />
        }

        if (!hasFetched) {
            return null;
        }
        return (
            <main className="body-content-container" ref={this.pageContainerRef}>
                <UserProfileHeader />
                <Section title="Recently Played Tracks">
                    <TrackCollection 
                        trackIds={recentTrackIds.slice(0,5)}
                        contextURI={userURI}
                        contextId={userId}
                    />
                </Section>
                <Carousel 
                    itemIds={topArtistIds}
                    title="Your Top Artists"
                    collectionType={collectionTypes.artists}
                    includeCreatePlaylistCard={false}
                />
                <Carousel 
                    itemIds={playlistIds}
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
    recentTrackIds: state.user.recentTracksIds,
    topArtistIds: state.user.topArtistsIds,
    playlistIds: state.user.playlistIds,
    isLoading: state.ui.loadingStatus.userProfile,
    hasFetched: state.user.fullProfileFetched
});

export const ConnectedUserProfile =  withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchUser: ActionCreators.fetchUser
    }
)(UserProfileContainer));
