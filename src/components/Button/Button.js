import React, { Component } from 'react';
import PropTypes from 'prop-types';


export class Button extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired,
        isWarning: PropTypes.bool,
        additionalStyles: PropTypes.object
    }

    static defaultProps = {
        additionalStyles: {}
    }

    state = {
        isHovered: false
    };

    handleMouseEnter = () => {
        this.setState({
            isHovered: true
        });
    }

    handleMouseLeave = () => {
        this.setState({
            isHovered: false
        });
    }

    render() {
        const { text, isWarning, handleClick, additionalStyles } = this.props;
        const { isHovered } = this.state;
        return (
            <button
                className={`button ${isWarning && 'button--warning'} ${isHovered && 'active'}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={handleClick}
                style={additionalStyles}
            >
                {text}
            </button>
        );
    }
}
