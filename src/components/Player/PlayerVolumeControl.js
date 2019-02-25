import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

    handleKeyDown = (e) => {
        const { key } = e;
        const { volumeDecimal } = this.state;
        if (key === 'ArrowUp' || key === 'ArrowRight') {
            e.preventDefault();
            const newVolumeDecimal = Math.min(1, volumeDecimal + 0.01);
            this.setState({
                volumeDecimal: newVolumeDecimal
            }, () => {
                this.props.setPlayerVolume(this.state.volumeDecimal);
            });
        } else if (key === 'ArrowDown' || key === 'ArrowLeft') {
            e.preventDefault();
            const newVolumeDecimal = Math.max(0, volumeDecimal - 0.01);
            this.setState({
                volumeDecimal: newVolumeDecimal
            }, () => {
                this.props.setPlayerVolume(this.state.volumeDecimal);
            });
        }
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
                    onKeyDown={this.handleKeyDown}
                    tabIndex="0"
                    role="slider"
                    aria-valuemax={1}
                    aria-valuemin={0}
                    aria-valuenow={volumeDecimal}
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