/*

Exports the three types of cards used throughout the application -

Card - used as part of flexbox based card grids

CarouselCard - used as part of swipable/scrollable carousel card layouts.

CreatePlaylistCard - a one-off card instance which sits within the users playlists carousel on the
user profile page. 

These cards are enhanced with specific behaviours via the DataPreFetcher and InteractionValidator render prop
components. DataPreFetcher ensures that the resource that the card links to is fetched and within the global
store before the user gets redirected to the new route. InteractionValidator keeps track of whether there is a
valid 'interaction' (touch or mouse) currently occuring within the rendered component. Interactions become 
invalidated when a certain threshold of scrolling has been exceeded during the interaction. 

When InteractionValidator and DataPreFetcher are composed together, the data prefetching functionality will not
be triggered if the current interaction has been invalidated. This means that when using the carousel component,
the data prefetching of a card within that carousel will never be triggered by a swiping action, only a regular
click/touch.

*/

export { CarouselCard } from './CarouselCard';
export { Card } from './Card';
export { CreatePlaylistCard } from './CreatePlaylistCard';
