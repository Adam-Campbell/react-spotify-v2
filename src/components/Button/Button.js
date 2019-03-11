import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buttonThemes } from '../../constants';


export class Button extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        handleClick: PropTypes.func.isRequired,
        additionalStyles: PropTypes.object,
        theme: PropTypes.oneOf([
            buttonThemes.standard,
            buttonThemes.warning,
            buttonThemes.alternate,
            buttonThemes.white
        ])
    };

    static defaultProps = {
        additionalStyles: {},
        theme: buttonThemes.standard
    };

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
        const { text, theme, handleClick, additionalStyles } = this.props;
        const { isHovered } = this.state;
        return (
            <button
                className={`button ${theme} ${isHovered ? 'active' : ''}`}
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
