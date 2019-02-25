import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clearInterval } from 'timers';

class TrackProgressBar extends Component {

    static propTypes = {
        getTrackProgress: PropTypes.func.isRequired,
        setTrackProgress: PropTypes.func.isRequired
    }

    state = {
        trackProgressDecimal: 0,
        progressBarActive: false
    };

    progBarOuterRef = React.createRef();
    progBarInnerRef = React.createRef();
    knobRef = React.createRef();
    knobInnerRef = React.createRef();
    progBarInterval = null;

    componentDidMount() {
        this.progBarInterval = setInterval(this.updateProgBar, 50);
        window.addEventListener('mouseup', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        clearInterval(this.progBarInterval);
        window.removeEventListener('mouseup', this.handleMouseUp);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    updateProgBar = async () => {
        if (this.progBarInnerRef.current && this.knobRef.current) {
            const { trackProgressDecimal, progressBarActive } = this.state;
            const progress = await this.props.getTrackProgress();
            if (progress !== trackProgressDecimal && !progressBarActive) {
                this.setState({
                    trackProgressDecimal: progress
                });
            }
        }
    }

    handleMouseDown = (e) => {
        e.stopPropagation();
        this.setState({
            progressBarActive: true
        });
    }

    handleMouseMove = (e) => {
        if (this.state.progressBarActive) {
            const { clientX } = e;
            const { left, width } = this.progBarOuterRef.current.getBoundingClientRect();
            const progressDecimal = (clientX - left) / width;
            const constrainedProgressDecimal = Math.max(0, Math.min(1, progressDecimal));
            this.setState({
                trackProgressDecimal: constrainedProgressDecimal
            });
        }
    }

    handleMouseUp = () => {
        if (this.state.progressBarActive) {
            this.props.setTrackProgress(this.state.trackProgressDecimal);
            this.setState({
                progressBarActive: false
            });
        }
    }

    handleClick = (e) => {
        const { target, clientX } = e;
        if (target !== this.knobRef.current && target !== this.knobInnerRef.current) {
            const { left, width } = this.progBarOuterRef.current.getBoundingClientRect();
            const progressDecimal = (clientX - left) / width;
            const constrainedProgressDecimal = Math.max(0, Math.min(1, progressDecimal));
            this.props.setTrackProgress(constrainedProgressDecimal);
        }
    }

    render() {
        const { trackProgressDecimal, progressBarActive } = this.state;
        return (
            <span 
                className="player-controls__prog-bar-outer" 
                ref={this.progBarOuterRef}
                onClick={this.handleClick}
            >
                <div 
                    className="player-controls__prog-bar-inner" 
                    ref={this.progBarInnerRef}
                    style={{ width: `${trackProgressDecimal*100}%` }}
                ></div>
                <span 
                    className="player-controls__prog-bar-knob" 
                    ref={this.knobRef}
                    style={{ left: `${trackProgressDecimal*100}%` }}
                    onMouseDown={this.handleMouseDown}
                >
                    <span className="player-controls__prog-bar-knob-inner" ref={this.knobInnerRef}></span>
                </span>
            </span>
        );
    }
}



export default TrackProgressBar;