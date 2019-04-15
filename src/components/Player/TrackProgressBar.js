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

    /**
     * Add event listeners to the window, this allows the 'interaction' with the progress control to continue
     * even if the mouse moves away from the control.
     */
    componentDidMount() {
        this.progBarInterval = setInterval(this.updateProgBar, 50);
        window.addEventListener('mouseup', this.handleInteractionEnd);
        window.addEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * When component unmounts, remove the event listeners that were added to the window.
     */
    componentWillUnmount() {
        clearInterval(this.progBarInterval);
        window.removeEventListener('mouseup', this.handleInteractionEnd);
        window.removeEventListener('mousemove', this.handleMouseMove);
    }

    /**
     * Gets the current track progress from a callback function passed down as a prop, and then updates
     * local component state to match the track progress. This is called on an interval, and doesn't 
     * update state whilst the progress bar is active - this allows the progress bar to scrubbed 
     * back and forth during an interaction without updating the actual track progress (and without the
     * actual track progress interfering with the position of the thumb of the progress bar), instead the
     * actual track progress is only updated at the end of the interaction.
     */
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

    /**
     * Updates the state to mark that an interaction is in progress.
     */
    handleInteractionStart = (e) => {
        e.stopPropagation();
        this.setState({
            progressBarActive: true
        });
    }

    /**
     * Calls the setTrackProgress callback function passed as a prop, which causes the player to update to
     * the position in the track specified by the trackProgressDecimal property in local component state.
     */
    handleInteractionEnd = (e) => {
        if (this.state.progressBarActive) {
            this.props.setTrackProgress(this.state.trackProgressDecimal);
            this.setState({
                progressBarActive: false
            });
        }
    }

    /**
     * Updates the trackProgressDecimal property in local component state, which will cause the component to 
     * update visually, but will not cause the actual track progress to update. This allows for the desired 
     * behaviour - the actual track doesn't update its position until the interaction has come to an end,
     * however the component will visually stay up to date throughout the interaction.
     * @param {Number} clientX - the clientX value from which to derive the new trackProgressDecimal value.
     */
    handleInteractionUpdate = (clientX) => {
        if (this.state.progressBarActive) {
            const { left, width } = this.progBarOuterRef.current.getBoundingClientRect();
            const progressDecimal = (clientX - left) / width;
            const constrainedProgressDecimal = Math.max(0, Math.min(1, progressDecimal));
            this.setState({
                trackProgressDecimal: constrainedProgressDecimal
            });
        }
    }

    /**
     * Grab the clientX value from the mousemove event object and call handleInteractionUpdate with clientX
     * as an arg.
     */
    handleMouseMove = (e) => {
        const { clientX } = e;
        this.handleInteractionUpdate(clientX);
    }

    /**
     * Grab the clientX value from the touchmove event object and call handleInteractionUpdate with clientX
     * as an arg.
     */
    handleTouchMove = (e) => {
        const { clientX } = e.targetTouches[0];
        this.handleInteractionUpdate(clientX);
    }

    /**
     * Calculates a new progressDecimal value based on the clientX value from a click event object, and
     * calls the setTrackProgress callback function with the desired value. This allows the track progress
     * to be updated with a click anywhere within the progress bar.
     */
    handleClick = (e) => {
        const { target, clientX } = e;
        if (target !== this.knobRef.current && target !== this.knobInnerRef.current) {
            const { left, width } = this.progBarOuterRef.current.getBoundingClientRect();
            const progressDecimal = (clientX - left) / width;
            const constrainedProgressDecimal = Math.max(0, Math.min(1, progressDecimal));
            this.props.setTrackProgress(constrainedProgressDecimal);
        }
    }

    /**
     * Contains the logic for adjusting the track progress bar via the arrow keys when the progress bar
     * is focused, providing the functionality you would expect with a convential range input. 
     */
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
