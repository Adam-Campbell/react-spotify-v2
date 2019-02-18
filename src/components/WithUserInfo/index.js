import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionCreators from '../../actions';

class WithUserInfo extends Component {

    componentDidMount() {
        if (!this.props.userId) {
            this.props.fetchUser();
        }
    }

    render() {
        const { children } = this.props;
        if (!this.props.userId) {
            return <p>Fetching user info</p>;
        }
        return children();
    }
}

const mapStateToProps = (state) => ({
    userId: state.user.id
});


export default connect(
    mapStateToProps,
    {
        fetchUser: ActionCreators.fetchUser
    }
)(WithUserInfo)