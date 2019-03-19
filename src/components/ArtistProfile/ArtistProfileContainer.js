import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as ActionCreators from '../../actions';
import ArtistProfile from './ArtistProfile';
import withAuthAndUserInfo from '../withAuthAndUserInfo';

class ArtistProfileContainer extends Component {

    static propTypes = {
        artistId: PropTypes.string.isRequired
    };

    componentDidMount() {
        this.props.fetchArtist(this.props.artistId);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.artistId !== this.props.artistId) {
            this.props.fetchArtist(this.props.artistId);
        }
    }

    render() {
        const { artistId, timestamp } = this.props;
        if (!timestamp) {
            return null;
        }
        return (
            <ArtistProfile artistId={artistId} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    timestamp: state.artists.timestamps[ownProps.artistId]
});

export const ConnectedArtistProfileContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchArtist: ActionCreators.fetchArtist
    }
)(ArtistProfileContainer));
