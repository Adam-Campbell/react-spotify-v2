/**
 * Will create a new state based off of prevState and data, if data already existed in prevState, it will just
 * merge data into the old version of data from prevState. If data did not exist in prevState, it will be added.
 * Use of this function ensures that when anything is added to the store it is non-destructive, you'll never end
 * up replacing a more thorough version of an asset with a less thorough version of that asset. The optional_id
 * param alters the behaviour of this function - without the optional_id param it assumes that data is a 
 * dictionary of objects that each need to incorporated into the store, where the key is the key to use when 
 * adding to the store. With the optional_id param it assumes that data is just one object that needs to be 
 * added to the store, and optional_id is the key to add it with.
 * @param {Object} prevState - the previous slice of state
 * @param {Object} data - either one asset to be added to the store, or a dictionary of assets 
 * @param {*} optional_id - the id to use as a key when data is just one asset.
 */
export const addOrMerge = (prevState, data, optional_id) => {
    const newState = { ...prevState };
    if (optional_id) {
        newState[optional_id] = newState[optional_id] ? 
        { ...newState[optional_id], ...data } : 
        { ...data };
    } else {
        for (const key in data) {
            newState[key] = newState[key] ? 
            { ...newState[key], ...data[key] } :
            { ...data[key] };
        }
    }
    return newState;
};