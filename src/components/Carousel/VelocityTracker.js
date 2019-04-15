/* 
A simple class for keeping track of the velocity of the current interaction. The addCoord method is called
within each requestAnimationFrame call, the two most recent coords (specifically x coords) are the stored in
the coords array, and the getVelocity method can then be called at any time to calculate a velocity based on the
two coords in the coords array.
*/
class VelocityTracker {

    // Internal store of coords
    coords = [ null, null ];

    /**
     * Add a new coord as the last coord in the coord store, and additionally remove the first coord.
     * @param {Number} newCoord - the new coord to add to the coord store.
     */
    addCoord = (newCoord) => {
        this.coords = [ ...this.coords.slice(1), newCoord ];
    }

    /**
     * Resets the coord store back to its original state of only null values.
     */
    resetCoords = () => {
        this.coords = [ null, null ];
    }

    /**
     * Calculate a velocity based on the coords in the coord store.
     */
    getVelocity = () => {
        if (this.coords.includes(null)) {
            return 0;
        }
        return this.coords[1] - this.coords[0];
    }
}

export default VelocityTracker;