import React, { Component } from 'react';
import WithAuth from '../WithAuth';
import WithUserInfo from '../WithUserInfo';

export default function withAuthAndUserInfo(WrappedComponent) {
    return class extends Component {
        render() {
            return (
                <WithAuth>
                    {() => (
                        <WithUserInfo>
                            {() => (
                                <WrappedComponent {...this.props} />
                            )}
                        </WithUserInfo>
                    )}
                </WithAuth>
            )
        }
    }
}