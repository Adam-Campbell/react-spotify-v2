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

    /**
     * Add event listeners to the window, this allows the 'interaction' with the volume control to continue
     * even if the mouse moves away from the control.
     */
    componentDidMount() {
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleInteractionEnd);
    }

    /**
     * When component unmounts, remove the event listeners that were added to the window.
     */
    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleInteractionEnd);
    }

    /**
     * Contains the logic needed to start an interaction with the volume control, whether by mouse or
     * by touch.
     */
    handleInteractionStart = (e) => {
        e.stopPropagation();
        this.setState({
            volumeControlActive: true
        });
    }

    /**
     * Contains the logic required to end an interaction with the volume control, whether by mouse or 
     * by touch.
     */
    handleInteractionEnd = () => {
        if (this.state.volumeControlActive) {
            this.setState({
                volumeControlActive: false
            });
        } 
    }

    /**
     * Contains the logic for updating an ongoing mouse interaction with the volume control.
     */
    handleMouseMove = (e) => {
        const { clientY } = e;
        if (this.state.volumeControlActive) {
            this.updateVolume(clientY);
        }
    }

    /**
     * Contains the logic for updating an ongoing touch interaction with the volume control.
     */
    handleTouchMove = (e) => {
        e.preventDefault();
        const { clientY } = e.targetTouches[0];
        if (this.state.volumeControlActive) {
            this.updateVolume(clientY);
        }
    }

    /**
     * Contains the logic for handling clicks interactions with the volume control.
     */
    handleClick = (e) => {
        const { clientY, target } = e;
        if (target !== this.knobRef.current && target !== this.knobInnerRef.current) {
            this.updateVolume(clientY);
        }
    }

    /**
     * Updates the volume of the player based on a given clientY value. 
     */
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

    /**
     * Contains the logic for interacting with the volume control via the keyboard, allowing the volume
     * to be increased or decreased in steps via arrow keys. 
     */
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
        const { volumeDecimal, volumeControlActive } = this.state;
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
                    className={`volume-control__knob ${volumeControlActive ? 'active' : ''}`}
                    style={{ bottom: `${volumeDecimal*100}%` }} 
                    ref={this.knobRef}
                    onMouseDown={this.handleInteractionStart}
                    onTouchStart={this.handleInteractionStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleInteractionEnd}
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