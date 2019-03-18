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
        if (!this.props.artistFetchedAt) {
            return null;
        }
        return (
            <ArtistProfile artistId={this.props.artistId} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    artistFetchedAt: state.artistsFetchedAt[ownProps.artistId]
});

export const ConnectedArtistProfileContainer = withAuthAndUserInfo(connect(
    mapStateToProps,
    {
        fetchArtist: ActionCreators.fetchArtist
    }
)(ArtistProfileContainer));
