import React, { Component } from 'react';


/**
 * A simple component for keeping track of whether there is a valid 'interaction' occuring on the rendered child
 * component. An 'interaction' begins with a mousedown or touchstart event, and ends either when a mouseup or
 * touchend event occurs, or when the current position of the mouse/touch deviates from the starting position
 * by more than 3px. Thus, any 'click' type of interaction will still count as an active interaction at the time 
 * that the mouseup or touchend event occurs, but 'swipe' interactions will already be invalidated by the time 
 * the mouseup or touchend event occurs. 
 */
class InteractionValidator extends Component {

    state = {
        isActive: false,
        startX: null,
        startY: null
    };

    /**
     * Contains the shared logic for starting an interaction, and is used internally by startMouseInteraction
     * and startTouchInteraction. 
     * @param {Number} clientX - the x coord that the interaction starts at.
     * @param {Number} clientY - the y coord that the interaction starts at.
     */
    startInteraction = (clientX, clientY) => {
        this.setState({
            isActive: true,
            startX: clientX,
            startY: clientY
        });
    }

    /**
     * Contains the logic for ending an interaction.
     */
    endInteraction = () => {
        this.setState({
            isActive: false,
            startX: null,
            startY: null
        });
    }

    /**
     * Grabs the clientX and clientY properties from the event object from a mousedown event and calls
     * startInteraction with clientX and clientY as args.
     * @param {Object} e - the event object
     */
    startMouseInteraction = (e) => {
        const { clientX, clientY } = e;
        this.startInteraction(clientX, clientY);
    }

    /**
     * Contains the logic for ensuring that the mouse interaction is still valid - that it has not deviated
     * by more than 3px from its starting location.
     * @param {Object} e - the event object.
     */
    updateMouseInteraction = (e) => {
        if (this.state.isActive) {
            const { clientX, clientY } = e;
            const { startX, startY } = this.state;
            const absX = Math.abs(clientX - startX);
            const absY = Math.abs(clientY - startY);
            if (absX > 3 || absY > 3) {
                this.endInteraction();
            }
        }
    }

    /**
     * Grabs the clientX and clientY properties from the event object from a touchdown event and calls 
     * startInteraction with clientX and clientY as args. 
     * @param {Object} e - the event object.
     */
    startTouchInteraction = (e) => {
        const { clientX, clientY } = e.targetTouches[0];
        this.startInteraction(clientX, clientY);
    }

    /**
     * Contains the logic for ensuring that the touch interaction is still valid - that it has not deviated
     * by more than 3px from its starting location.
     * @param {Object} e - the event object.
     */
    updateTouchInteraction = (e) => {
        if (this.state.isActive) {
            const { clientX, clientY } = e.targetTouches[0];
            const { startX, startY } = this.state;
            const absX = Math.abs(clientX - startX);
            const absY = Math.abs(clientY - startY);
            if (absX > 3 || absY > 3) {
                this.endInteraction();
            }
        }
    }

    render() {
        const { isActive } = this.state;
        const { children } = this.props;
        return children({
            startMouseInteraction: this.startMouseInteraction,
            updateMouseInteraction: this.updateMouseInteraction,
            startTouchInteraction: this.startTouchInteraction,
            updateTouchInteraction: this.updateTouchInteraction,
            endInteraction: this.endInteraction,
            isActive: isActive,
            shouldManageValidation: true
        });
    }
}

export default InteractionValidator;
