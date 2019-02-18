import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import UserProfileHeader from '../UserProfileHeader';
import TrackCollection from '../TrackCollection';
import Section from '../Section';
import CardCollection from '../CardCollection';
import { collectionTypes } from '../../constants';

class UserProfileContainer extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        if (!this.props.userId) {
            return null;
        }
        return (
            <main className="user-profile">
                <UserProfileHeader />
                <Section title="Recently Played Tracks">
                    <TrackCollection 
                        trackIds={this.props.recentTracksIds.slice(0,5)}
                    />
                </Section>
                <Section title="Your Top Artists">
                    <CardCollection 
                        itemIds={this.props.topArtistsIds}
                        collectionType={collectionTypes.artists}
                    />
                </Section>
                <Section title="Your Playlists">
                    <CardCollection 
                        itemIds={this.props.playlistIds}
                        collectionType={collectionTypes.playlists}
                        includeCreatePlaylistCard={true}
                    />
                </Section>
            </main>
        )
    }
}

const mapStateToProps = (state) => ({
    userId: state.user.id,
    recentTracksIds: state.user.recentTracksIds,
    topArtistsIds: state.user.topArtistsIds,
    playlistIds: state.user.playlistIds
});

export default connect(
    mapStateToProps,
    {
        fetchUser: ActionCreators.fetchUser
    }
)(UserProfileContainer);
