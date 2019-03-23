import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../../actions';
import Loader from '../Loader';
import { getUserProfile } from '../../selectors';

class WithUserInfo extends Component {

    componentDidMount() {
        if (!this.props.hasFetched) {
            this.props.fetchUser();
        }
    }

    render() {
        const { hasFetched, children } = this.props;
        if (!hasFetched) {
            return <Loader />
        }
        return children();
    }
}

const mapStateToProps = (state) => ({
    hasFetched: getUserProfile(state).fullProfileFetched
});

export default connect(
    mapStateToProps,
    { fetchUser }
)(WithUserInfo);
