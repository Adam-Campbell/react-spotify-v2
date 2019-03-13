import VelocityTracker from './VelocityTracker';


test(`adds a new coord to the end of the coords array and removes the first entry from the coords array 
every time the addCoord method is called`, () => {
    const velocityTracker = new VelocityTracker();
    expect(velocityTracker.coords).toEqual([null, null]);
    velocityTracker.addCoord(5);
    expect(velocityTracker.coords).toEqual([null, 5]);
    velocityTracker.addCoord(8);
    expect(velocityTracker.coords).toEqual([5, 8]);
});

test(`the getVelocity method returns the result of subtracting the older of the two coords from the newer 
coord, whether it is positive or negative`, () => {
    const velocityTracker = new VelocityTracker();
    velocityTracker.addCoord(10);
    velocityTracker.addCoord(14);
    // coords is now [10, 14]
    expect(velocityTracker.getVelocity()).toBe(4);
    velocityTracker.addCoord(8);
    // coords is now [14, 8]
    expect(velocityTracker.getVelocity()).toBe(-6); 
});

test(`If at least one of the coords in the coords array is still null, getVelocity just returns 0`, () => {
    const velocityTracker = new VelocityTracker();
    // both coords are null
    expect(velocityTracker.getVelocity()).toBe(0);
    velocityTracker.addCoord(2);
    // one coord is still null
    expect(velocityTracker.getVelocity()).toBe(0);
    velocityTracker.addCoord(20);
    // both coords are now integers
    expect(velocityTracker.getVelocity()).toBe(18);
});
