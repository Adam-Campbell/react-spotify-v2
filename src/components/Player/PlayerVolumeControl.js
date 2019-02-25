import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PlayerVolumeControl extends Component {

    static propTypes = {
        setPlayerVolume: PropTypes.func.isRequired
    };
    
    state = {
        volumeDecimal: 1,
        volumeControlActive: false
    };

    volumeControlRef = React.createRef();
    knobRef = React.createRef();
    knobInnerRef = React.createRef();

    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
    }

    handleMouseDown = (e) => {
        e.stopPropagation();
        this.setState({
            volumeControlActive: true
        });
    }

    handleMouseMove = (e) => {
        const { clientY } = e;
        if (this.state.volumeControlActive) {
            this.updateVolume(clientY);
        }
    }

    handleMouseUp = () => {
        if (this.state.volumeControlActive) {
            this.setState({
                volumeControlActive: false
            });
        }    
    }

    handleClick = (e) => {
        const { clientY, target } = e;
        if (target !== this.knobRef.current && target !== this.knobInnerRef.current) {
            this.updateVolume(clientY);
        }
    }

    updateVolume = (clientY) => {
        const { top, height } = this.volumeControlRef.current.getBoundingClientRect();
        const volumeDecimal = 1 - ((clientY - top) / height);
        const constrainedVolumeDecimal = Math.max(0, Math.min(volumeDecimal, 1));
        this.setState({
            volumeDecimal: constrainedVolumeDecimal
        }, () => {
            this.props.setPlayerVolume(this.state.volumeDecimal);
        });
    }

    render() {
        const { volumeDecimal } = this.state;
        console.log(volumeDecimal)
        return (
            <span 
                className="volume-control"
                ref={this.volumeControlRef}
                onClick={this.handleClick}
            >
                <div 
                    className="volume-control__inner"
                    style={{ height: `${volumeDecimal*100}%` }}
                ></div>
                <span 
                    className="volume-control__knob"
                    style={{ bottom: `${volumeDecimal*100}%` }} 
                    ref={this.knobRef}
                    onMouseDown={this.handleMouseDown}
                >
                    <span 
                        className="volume-control__knob-inner"
                        ref={this.knobInnerRef}
                    ></span>
                </span>
            </span>
        );
    }
}

export default PlayerVolumeControl;