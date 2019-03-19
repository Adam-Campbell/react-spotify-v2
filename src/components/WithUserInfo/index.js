import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';
import Loader from '../Loader';

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
    hasFetched: state.user.fullProfileFetched
});

export default connect(
    mapStateToProps,
    {
        fetchUser: ActionCreators.fetchUser
    }
)(WithUserInfo);
