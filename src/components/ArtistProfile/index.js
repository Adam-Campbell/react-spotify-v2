import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import ArtistProfileHeader from '../ArtistProfileHeader';
import Section from '../Section';
import TrackCollection from '../TrackCollection';
import CardCollection from '../CardCollection';
import { collectionTypes } from '../../constants';

class ArtistProfileContainer extends Component {
    componentDidMount() {
        this.props.fetchArtist(this.props.artistId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.artistId !== this.props.artistId) {
            this.props.fetchArtist(this.props.artistId);
        }
    }

    render() {
        if (!this.props.artist || !this.props.artist.fullProfileFetched) {
            return null;
        }
        const { topTrackIds, albumIds, relatedArtistIds } = this.props.artist;
        return (
            <main className="artist-profile">
                <ArtistProfileHeader 
                    artistId={this.props.artistId}
                />
                <Section title="Popular Tracks">
                    <TrackCollection 
                        trackIds={topTrackIds.slice(0,5)}
                    />
                </Section>
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
            </main>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    artist: state.artists.artistData[ownProps.artistId]
});

export default connect(
    mapStateToProps,
    {
        fetchArtist: ActionCreators.fetchArtist
    }
)(ArtistProfileContainer);
