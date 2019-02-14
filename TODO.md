## UI

- Category fetching needs to be updated so that when fetching a category it fetches the categories general info as well as its playlists. This ensures that all of the necessary info will be present even if the users entry point into the app is the category page itself. 

- Playlist route needs to identify whether the playlist being view is owned by the current user, and render appropriately. Either create two completely seperate components that the route can render depending on whether the playlist is owned by the user, or create one component that it will always render, and that component will conditionaly render certain parts depending on whether the user owns the playlist. --DONE--

- Playlist editing functionality needs to be implemented. Adding tracks to / removing tracks from playlists, updating the name of playlist and uploading new cover images for the playlist. --DONE--

- The add to playlist button that appears within the Track component needs to be made functional. Add a tooltip to indicate what it does (use premade tooltip solution) -- DONE -- (minus tooltip)

- The Followers component needs to be updated to show a Follow/Unfollow button where appropriate, with callbacks supplied to the component to handle the actual following/unfollowing. -- DONE --

- Modals need to be implement to handle creating playlists, uploading cover images, adding a track to a playlist, global errors. Use a premade modal solution for this. 

- Image placeholder functionality needs to be implemented for the scenarios where the API returns a resource that doesn't have an image associated with it.

- Possibly add links to the most recently viewed artist (or the n most recently viewed artists) in the nav.

- Investigate using netflix style sliders to display the cards, rather than the grid layout currently being used to display them.


## Audio

- Implement a player. The player will use Spotifys full playback SDK where available (when the browser is supported and the current user is a premium user), and falls back to just using the 30s preview URLs when the playback SDK can't be used. 

- The player should hide all of the implementation details around whether it is using the SDK or the preview URLs. The interface it exposes to the rest of the app should just be based around what the app needs the player to do (play, pause, stop, skip, toggleRepeat, shuffle etc), and only the player should be concerned with exactly how the operations are performed. 


