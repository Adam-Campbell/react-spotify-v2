import React, { Component } from 'react';
import { connect } from 'react-redux';

class PlayerVolumeControl extends Component {
    render() {
        return (
            <span className="volume-control">
                <div className="volumne-control__inner"></div>
                <span className="volume-control__knob" >
                    <span className="volume-control__knob-inner"></span>
                </span>
            </span>
        );
    }
}

export default PlayerVolumeControl;