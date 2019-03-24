import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import UserProfileHeader from '../UserProfileHeader';
import TrackCollection from '../TrackCollection';
import Section from '../Section';
import { collectionTypes } from '../../constants';
import { TimelineMax } from 'gsap';
import Carousel from '../Carousel';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import { Loader } from '../Loaders';
import { 
    getUserProfile, 
    getUserPlaylistIds, 
    getUserRecentTrackIds, 
    getUserTopArtistIds,
    getLoadingStatus
} from '../../selectors';
import { Helmet } from 'react-helmet';

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
            hasFetched,
            hasUserData 
        } = this.props;

        if (isLoading) {
            return (
                <React.Fragment>
                    <Helmet>
                        <title>Your profile - Reactify</title>
                    </Helmet>
                    <Loader />
                </React.Fragment>
            );
        }

        if (!hasFetched) {
            return null;
        }
        return (
            <React.Fragment>
                <Helmet>
                    <title>Your profile - Reactify</title>
                </Helmet>
                <main className="body-content-container" ref={this.pageContainerRef}>
                    <UserProfileHeader />
                    
                    {
                        hasUserData ? (
                            <React.Fragment>
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
                            </React.Fragment>
                        ) : (
                            <div className="user-profile-intro">
                                <h2 className="heading">New around here?</h2>
                                <p className="user-profile-intro-text">
                                    We don't have much to show on your profile yet! Click the menu icon to the left to start browsing.
                                </p>
                            </div>
                        )
                    }
                    
                </main>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = (state) => {
    const user = getUserProfile(state);
    console.log(user);
    const hasUserData = user.recentTrackIds.length && 
                        (user.topArtistIds.length || user.playlistIds.length)
    return {
        userId: user.id,
        userURI:user.uri,
        recentTrackIds: user.recentTrackIds,
        topArtistIds: user.topArtistIds,
        playlistIds: user.playlistIds,
        isLoading: getLoadingStatus(state, 'userProfile'),
        hasFetched: user.fullProfileFetched,
        hasUserData
    };
};

export const ConnectedUserProfile =  withAuthAndUserInfo(connect(
    mapStateToProps,
    { fetchUser }
)(UserProfileContainer));
