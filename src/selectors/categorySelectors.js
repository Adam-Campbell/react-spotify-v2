export const getAllCategories = (state) => state.categories.entities;
export const getCategory = (state, categoryId) => state.categories.entities[categoryId];
export const getCategoryPlaylistIds = (state, categoryId) => state.categories.playlistIds[categoryId];
export const getCategoryTimestamp = (state, categoryId) => state.categories.timestamps[categoryId];

