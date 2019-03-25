import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchArtist } from '../../actions';
import ArtistProfile from './ArtistProfile';
import withAuthAndUserInfo from '../withAuthAndUserInfo';
import { Loader } from '../Loaders';
import { getArtistTimestamp, getLoadingStatus } from '../../selectors';

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
        const { artistId, timestamp, isLoading } = this.props;
        if (isLoading) {
            return <Loader />;
        }
        if (!timestamp) {
            return null;
        }
        return (
            <ArtistProfile artistId={artistId} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    timestamp: getArtistTimestamp(state, ownProps.artistId),
    isLoading: getLoadingStatus(state, 'artistProfile')
});

export const ConnectedArtistProfileContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    { fetchArtist }
)(ArtistProfileContainer));
