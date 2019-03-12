import React from 'react';
import { shallow } from 'enzyme';
import InteractionValidator from './InteractionValidator';

const mockedRenderProp = jest.fn();

const wrapper = shallow(
    <InteractionValidator>
        {({ isActive }) => mockedRenderProp(isActive)}
    </InteractionValidator>
);

test('isActive prop is passed down to child, and is false by default', () => {
    expect(mockedRenderProp).lastCalledWith(false);
});

test('isActive becomes true when a mouse interaction starts, and false again when the interaction ends', () => {
    wrapper.instance().startMouseInteraction({ clientX: 200, clientY: 200 });
    expect(mockedRenderProp).lastCalledWith(true);
    wrapper.instance().endInteraction();
    expect(mockedRenderProp).lastCalledWith(false);
})

test('isActive becomes true when a touch interaction starts, and false again when the interaction ends', () => {
    wrapper.instance().startTouchInteraction({ targetTouches: [{ clientX: 200, clientY: 200 }] });
    expect(mockedRenderProp).lastCalledWith(true);
    wrapper.instance().endInteraction();
    expect(mockedRenderProp).lastCalledWith(false);
});

test(`isActive is made false if the current interaction deviates from its origin position by more than
3px, for both mouse and touch interactions`, () => {
    wrapper.instance().startMouseInteraction({ clientX: 200, clientY: 200 });
    expect(mockedRenderProp).lastCalledWith(true);
    wrapper.instance().updateMouseInteraction({ clientX: 210, clientY: 200 });
    expect(mockedRenderProp).lastCalledWith(false);

    wrapper.instance().startTouchInteraction({ targetTouches: [{ clientX: 200, clientY: 200 }] });
    expect(mockedRenderProp).lastCalledWith(true);
    wrapper.instance().updateTouchInteraction({ targetTouches: [{ clientX: 210, clientY: 200 }] });
    expect(mockedRenderProp).lastCalledWith(false);
});