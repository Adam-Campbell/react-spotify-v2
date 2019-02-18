import { TimelineMax } from 'gsap';

/**
 * A function that can be called by the various header component, it determines whether a transtion needs to
 * be animated, and constructs the animation timeline if it does. 
 * @param {?TimelineMax} timeline - either an instance of the TimelineMax class, or null.
 * @param {Object} options - an object holding additional params
 * @param {?HTMLElement} options.image - a reference to the image DOM node.
 * @param {?HTMLElement} options.title - a reference to the title/heading DOM node
 * @param {?HTMLElement} options.underline - a reference to the DOM node acting as an underline for title
 * @param {?HTMLElement} options.container - a reference to the DOM node containing any additional elements
 * @param {?Number} options.prevImageWidth - the width of the image that was clicked pre-route-change
 * @param {?Number} options.prevImageHeight - the height of the image that was clicked pre-route-change
 * @param {?Number} options.prevImageTop - the top offset of the image that was clicked pre-route-change
 * @param {?Number} options.prevImageLeft - the left offset of the image that was clicked pre-route-change
 * @param {Number} options.imageTop - the top offset of the image that has rendered post-route-change
 * @param {Number} options.imageLeft - the left offset of the image that has rendered post-route-change
 * @param {Boolean} options.hasTransition - a boolean indicating whether a transition needs to be animated
 */
export const constructTimeline = (timeline, options) => {
    const {  
        image, 
        title, 
        underline, 
        container,
        prevImageWidth,
        prevImageHeight, 
        prevImageTop,
        prevImageLeft,
        imageTop,
        imageLeft,
        hasTransition
    } = options;
    
    // Return early if the current mounting/updating operation doesn't require a transition (!hasTransition),
    // or if any of the react refs passed in don't currently have an actual DOM node associated with them.
    // Prevents errors where GSAP ends up trying to set attributes on null instead of a DOM node. 
    if (!hasTransition || !image || !title || !underline || !container) {
        return;
    }

    // If timeline is already an instance of TimelineMax then it needs to be cleared, if not then it needs
    // to be set to an instance of TimelineMax
    if (timeline) {
        timeline.clear();
    } else {
        timeline = new TimelineMax();
    }
    
    // Now calculate the deltaX and deltaY based off of the prev and current image positions. This is the
    // initial transform that the img DOM node needs to animate from.
    const deltaX = prevImageLeft - imageLeft;
    const deltaY = prevImageTop - imageTop;

    // Now construct the timeline
    timeline.from(image, 0.3, {
        width: prevImageWidth,
        height: prevImageHeight,
        x: deltaX,
        y: deltaY
    })
    .from(title, 0.4, {
        opacity: 0
    })
    .from(underline, 0.6, {
        scaleX: 0
    })
    .from(container, 0.4, {
        opacity: 0
    });
}