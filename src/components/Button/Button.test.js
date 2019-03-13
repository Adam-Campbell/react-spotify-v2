import React from 'react';
import { shallow } from 'enzyme';
import { Button } from './Button';
import { buttonThemes } from '../../constants';

const mockedHandleClick = jest.fn();

test('renders a button with the text supplied in the text prop', () => {
    const wrapper = shallow(
        <Button 
            text="Click me!"
            handleClick={mockedHandleClick}
        />
    ); 
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.find('button').first().text()).toEqual('Click me!');
});

test('applies a theme class to the button according to the theme prop supplied', () => {
    const withStandardTheme = shallow(
        <Button 
            text="Click me!"
            handleClick={mockedHandleClick}
            theme={buttonThemes.standard}
        />
    );
    const withWarningTheme = shallow(
        <Button 
            text="Click me!"
            handleClick={mockedHandleClick}
            theme={buttonThemes.warning}
        />
    );
    expect(withStandardTheme.find('button').first().props().className)
    .toBe('button button--standard ');

    expect(withWarningTheme.find('button').first().props().className)
    .toBe('button button--warning ');
});

test('enters and exits the hovered state when a mouse moves over and leaves the button', () => {
    const wrapper = shallow(
        <Button 
            text="Click me!"
            handleClick={mockedHandleClick}
        />
    );
    expect(wrapper.state().isHovered).toBe(false);
    wrapper.find('button').simulate('mouseEnter');
    expect(wrapper.state().isHovered).toBe(true);
    wrapper.find('button').simulate('mouseLeave');
    expect(wrapper.state().isHovered).toBe(false);
});

test('calls the function supplied as handleClick prop when a click event occurs on the button', () => {
    const wrapper = shallow(
        <Button 
            text="Click me!"
            handleClick={mockedHandleClick}
        />
    );
    expect(mockedHandleClick).not.toHaveBeenCalled();
    wrapper.find('button').simulate('click');
    expect(mockedHandleClick).toHaveBeenCalledTimes(1);
});

test('takes any inline styles in the additionalStyles prop and passes them to the rendered button', () => {
    const wrapper = shallow(
        <Button 
            text="Click me!"
            handleClick={mockedHandleClick}
            additionalStyles={{ marginLeft: '8px' }}
        />
    );
    expect(wrapper.find('button').props().style).toEqual({ marginLeft: '8px' });
});
