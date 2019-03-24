import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        window.addEventListener('mouseup', this.handleInteractionEnd);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
        clearInterval(this.progBarInterval);
        window.removeEventListener('mouseup', this.handleInteractionEnd);
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

    handleInteractionStart = (e) => {
        e.stopPropagation();
        this.setState({
            progressBarActive: true
        });
    }

    handleInteractionEnd = (e) => {
        if (this.state.progressBarActive) {
            this.props.setTrackProgress(this.state.trackProgressDecimal);
            this.setState({
                progressBarActive: false
            });
        }
    }

    handleInteractionUpdate = (clientX) => {
        if (this.state.progressBarActive) {
            //const { clientX } = e;
            const { left, width } = this.progBarOuterRef.current.getBoundingClientRect();
            const progressDecimal = (clientX - left) / width;
            const constrainedProgressDecimal = Math.max(0, Math.min(1, progressDecimal));
            this.setState({
                trackProgressDecimal: constrainedProgressDecimal
            });
        }
    }

    handleMouseMove = (e) => {
        const { clientX } = e;
        this.handleInteractionUpdate(clientX);
    }

    handleTouchMove = (e) => {
        const { clientX } = e.targetTouches[0];
        this.handleInteractionUpdate(clientX);
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

    handleKeyDown = (e) => {
        const { key } = e;
        const { trackProgressDecimal } = this.state;
        if (key === 'ArrowUp' || key === 'ArrowRight') {
            e.preventDefault();
            const newTrackProgressDecimal = Math.min(1, trackProgressDecimal + 0.01);
            this.props.setTrackProgress(newTrackProgressDecimal);
        } else if (key === 'ArrowDown' || key === 'ArrowLeft') {
            e.preventDefault();
            const newTrackProgressDecimal = Math.max(0, trackProgressDecimal - 0.01);
            this.props.setTrackProgress(newTrackProgressDecimal);
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
                    className={`player-controls__prog-bar-knob ${progressBarActive ? 'active' : ''}`}
                    ref={this.knobRef}
                    style={{ left: `${trackProgressDecimal*100}%` }}
                    onMouseDown={this.handleInteractionStart}
                    onTouchStart={this.handleInteractionStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleInteractionEnd}
                    onKeyDown={this.handleKeyDown}
                    tabIndex="0"
                    role="slider"
                    aria-valuemax={1}
                    aria-valuemin={0}
                    aria-valuenow={trackProgressDecimal}
                >
                    <span className="player-controls__prog-bar-knob-inner" ref={this.knobInnerRef}></span>
                </span>
            </span>
        );
    }
}

export default TrackProgressBar;
