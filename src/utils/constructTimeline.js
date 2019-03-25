import { TimelineMax } from 'gsap';

/**
 * A function that can be called by the various header component, it determines whether a transtion needs to
 * be animated, and constructs the animation timeline if it does. 
 * @param {?TimelineMax} timeline - either an instance of the TimelineMax class, or null.
 * @param {Object} options - an object holding additional params
 * @param {?HTMLElement} options.image - a reference to the image DOM node.
 * @param {?HTMLElement} options.title - a reference to the title/heading DOM node
 * @param {?HTMLElement} options.underline - a reference to the DOM node acting as an underline for title
 * @param {?HTMLElement} options.headerAdditional - a reference to the DOM node containing any additional header elements
 * @param {?HTMLElement} options.mainContent - a reference to the DOM node containing the main content of the page
 * @param {?HTMLElement} options.fullPage - a reference to the DOM node containing the entire page
 * @param {?Number} options.prevImageWidth - the width of the image that was clicked pre-route-change
 * @param {?Number} options.prevImageHeight - the height of the image that was clicked pre-route-change
 * @param {?Number} options.prevImageTop - the top offset of the image that was clicked pre-route-change
 * @param {?Number} options.prevImageLeft - the left offset of the image that was clicked pre-route-change
 * @param {Number} options.currImageWidth - the width of the image that has rendered post-route-change
 * @param {Number} options.currImageHeight - the height of the image that has rendered post-route-change
 * @param {Number} options.currImageTop - the top offset of the image that has rendered post-route-change
 * @param {Number} options.currImageLeft - the left offset of the image that has rendered post-route-change
 * @param {Boolean} options.hasTransition - a boolean indicating whether a transition needs to be animated
 */
export const constructTimeline = (timeline, options) => {
    const {  
        image, 
        title, 
        underline, 
        headerAdditional,
        mainContent,
        fullPage,
        prevImageWidth,
        prevImageHeight, 
        prevImageTop,
        prevImageLeft,
        currImageHeight,
        currImageWidth,
        currImageTop,
        currImageLeft,
        hasTransition
    } = options;

    // Return early if any of the refs passed in do not currently have a DOM node associated with them. 
    // Prevents errors where GSAP ends up trying to set attributes on null instead of a DOM node. 
    if (!image || !title || !underline || !headerAdditional || !mainContent || !fullPage) {
        return;
    }

    // If timeline is already an instance of TimelineMax then it needs to be cleared, if not then it needs
    // to be set to an instance of TimelineMax
    if (timeline) {
        timeline.clear();
    } else {
        timeline = new TimelineMax();
    }

    // When hasTransition is true, construct a more complicated timeline that gives the appearance of the card
    // that was previously clicked transitioning into the main image at the top of the new page
    if (hasTransition) {
        // Now calculate the deltaX and deltaY based off of the prev and current image positions. This is the
        // initial transform that the img DOM node needs to animate from.
        const deltaX = prevImageLeft - currImageLeft;
        const deltaY = prevImageTop - currImageTop;

        // Calculate the factor that the new image has to scale up or down by to match the size of the 
        // previous image   old / new
        const deltaScaleX = prevImageWidth / currImageWidth;
        const deltaScaleY = prevImageHeight / currImageHeight;

        // Now construct the timeline
        timeline.from(image, 0.4, {
            x: deltaX,
            y: deltaY,
            scaleX: deltaScaleX,
            scaleY: deltaScaleY
        })
        .from(title, 0.25, {
            opacity: 0
        })
        .from(underline, 0.25, {
            scaleX: 0
        })
        .from(headerAdditional, 0.25, {
            opacity: 0
        })
        .from(mainContent, 0.25, {
            opacity: 0
        });
        // When hasTransition is false, construct a simple timeline which just fades everything in. 
    } else {
        timeline.from(fullPage, 0.6, {
            opacity: 0
        });
    }
}