/* 
A simple class for keeping track of the velocity of the current interaction. The addCoord method is called
within each requestAnimationFrame call, the two most recent coords (specifically x coords) are the stored in
the coords array, and the getVelocity method can then be called at any time to calculate a velocity based on the
two coords in the coords array.
*/
class VelocityTracker {

    coords = [ null, null ];

    addCoord = (newCoord) => {
        this.coords = [ ...this.coords.slice(1), newCoord ];
    }

    getVelocity = () => {
        for (let coord of this.coords) {
            if (coord === null) {
                return 0;
            }
        }
        return this.coords[1] - this.coords[0];
    }
}

export default VelocityTracker;