## CURRENT TODOS

- Include more thorough testing. 

- Improve modal appearance

- Improve general app appearance

- Add pagination to certain track lists (ie playlists that include more than 50 tracks)

- Look for any improvements that can be made to data layer. Take a look at utilising selectors when mapping state to props. Also consider seperating out relationship associations into seperate reducers. This includes things like the array of an artists top tracks, which are not part of the artist object itself, but I'm adding onto the artist object in the store currently, and this is happening seperately from fetching the main artist object. Instead I could have an artistTopTracks reducer which is a dictionary where each key is the artist id and the associated value is the array of top track ids. This would lead to me having more reducers to deal with but would make other logic simpler. 

- [DONE] improving the animations - when transitioned from a card, as well as the specific header animations, give the rest of the page a fade in animation. When a page is navigated to without transitioning from a card, just give the whole page including the header a fade in animation.

- [DONE] implementing a netflix style slider to hold the cards. Needs to support mouse and touch.

- [DONE except for lazy loading] implementing an image component that will be used to replace all images in the app. It will display a fallback svg in the event that there is no image url to use, and when there is one to use it will lazy load the image. If I use the intersetction observer API for lazy loading I will need to include a polyfill for IE. 


- [DONE] Investigate storing an SCSS file for each component within the folder for that component and importing it within the index.js file for that folder, as opposed to just having a seperate SCSS folder holding all of the SCSS.


- [DONE] Investigate the warning message I'm getting when starting the app. I believe it is because I'm potentially dispatching an action within render (the checkForAccessToken method potentially dispatches an action). I should refactor this, and potentially use this as an opportunity to review the general auth flow. Regarding the warning, I think I should just check if the accessToken prop is there in render, if it is then I render the app, if not then I render null, but I don't redirect within the render method. In componentDidMount I will check for the access token in window hash, local storage etc, and if it isn't there then I will programatically redirect from within the componentDidMount method. 




## Page transitions

- Transitions will be managed at the route level. 

- When navigating to the artist, album or playlist routes, if hasTransition is true then the full card transforing into main image animation will play out. If hasTransition is false, then everything on the page simply fades in. 

- Do the same checks when the entity id changes but the route does not - either playing the full card animation or just a fade in. At the moment there is no scenario where a transition to a new id on the same route would occur without using the full card transition, but it will be more future proof to just leave the check in. 

- Think about possible transitions for the other routes. 

- Think about possible mounting transitions for the various modals. 
























## LEGACY

## UI

- Category fetching needs to be updated so that when fetching a category it fetches the categories general info as well as its playlists. This ensures that all of the necessary info will be present even if the users entry point into the app is the category page itself.   (unsure if this is necessary)

- Playlist route needs to identify whether the playlist being view is owned by the current user, and render appropriately. Either create two completely seperate components that the route can render depending on whether the playlist is owned by the user, or create one component that it will always render, and that component will conditionaly render certain parts depending on whether the user owns the playlist. --DONE--

- Playlist editing functionality needs to be implemented. Adding tracks to / removing tracks from playlists, updating the name of playlist and uploading new cover images for the playlist. --DONE--

- The add to playlist button that appears within the Track component needs to be made functional. Add a tooltip to indicate what it does (use premade tooltip solution) -- DONE -- (minus tooltip)

- The Followers component needs to be updated to show a Follow/Unfollow button where appropriate, with callbacks supplied to the component to handle the actual following/unfollowing. -- DONE --

- Modals need to be implement to handle creating playlists, uploading cover images, adding a track to a playlist, global errors. Use a premade modal solution for this. --DONE--

- Image placeholder functionality needs to be implemented for the scenarios where the API returns a resource that doesn't have an image associated with it.

- Possibly add links to the most recently viewed artist (or the n most recently viewed artists) in the nav.

- Investigate using netflix style sliders to display the cards, rather than the grid layout currently being used to display them.














## Audio

- Implement a player. The player will use Spotifys full playback SDK where available (when the browser is supported and the current user is a premium user), and falls back to just using the 30s preview URLs when the playback SDK can't be used. 

- The player should hide all of the implementation details around whether it is using the SDK or the preview URLs. The interface it exposes to the rest of the app should just be based around what the app needs the player to do (play, pause, stop, skip, toggleRepeat, shuffle etc), and only the player should be concerned with exactly how the operations are performed. 



# Player user stories

Note: 'Player state' here refers to the info / metadata powering the player, such as play/pause state, current track etc. This could be stored in a Redux store, or stored in some other way. The important detail is that the entire UI can access this data, and thus can derive its own state from this data.  

- I can click play on any track that is not currently playing, and it will start playing the audio for that track. The player state will also update to reflect the new track being played, and in turn the UI will update as well.

- I can click play on the track that is currently playing and it will pause the audio for that track. It will update the player state and thus the UI to show that this track has been paused. 

- I can click on the skip forward button to skip to the next track, or if I'm currently listening to the last track of a certain context, it will either skip to the first track from that context, or just stop playing, depending on the current repeat settings. The player state and the UI will update to reflect the new being played (or not being played as the case may be).

- When I click on the skip backward button, if the currently playing track is 3 secs or more into the song, it will skip the audio back to the start of the current track. If the currently playing track is less than 3 secs into the song, it will skip the audio back to the track before the current one within the same context. If I was already on the first track of the context, then it will either skip to the last track of the current context, or just skip back to the start of the current track. If the track does change as a result of pressing the skip backward button, the player state and UI will update to reflect this. 

- When I interact with the track scrubber, it will take the position at which I stop scrubbing it, and move the track to that position. This will be updated in the audio and in the UI, but the player state will not keep track of the current position within a track. 

- If I enter shuffle mode whilst audio is playing, the track list for the currently playing context will be updated in the player state such that the currently playing track is first in the list, and then the remainder of tracks are ordered randomly. I will be able to skip forwards and backwards through the tracks and this new shuffled order will be preserved until I turn shuffle off or switch to a new context. I will not see any UI indications that shuffling has occured beyond the shuffle icon being in an active state.

- If I turn shuffling off without switching contexts, the track list will be returned to its normal order, and my position in the track list will be the position of the currently playing track when in the normal unshuffled track list (which is not necessarily the same position as it occupied previous to my unshuffling of the track list).

- If I switch contexts whilst shuffling is enabled, the track list of the new context will automatically be shuffled for me when I first switch to that context. It will be shuffled such that the track that I specifically selected to play will be first within this shuffled order, then the rest of the tracks will be randomly ordered. This order will then be respected by any skip forward / skip backward actions taken, until I do something such as switching contexts that causes the order to be discarded. 

- I can switch between three repeat modes, NO_REPEAT, CONTEXT_REPEAT and TRACK_REPEAT, each with their own set of behaviours. The player state will be updated to reflect the new repeat mode, however I don't expect to see any indications of it in the UI beyond the repeat icon updating. 




# What information does the UI need?


- It needs to know the playing status of the track (playing / paused) so that it can render the correct icon in any place that a play or pause icon needs to appear.

- It needs to know the identifiers for both the current track and the context of the current track. This enables the UI to display the correct state for any tracks currently being rendered with the view (the currently playing track will look different to every other track). The context is necessary because the same track can appear in multiple contexts, but we only want the UI to recognise it as the currently playing track when both the track and the context match. 

- It needs to know the current volume of the player. Should this be in player state or should the volume control be given the means to interact directly with the audio (whether from audio elem or from SDK)? During volume updating, the volume will be set many times (to allow the volume to change whilst the user drags the actual slider control), so if the player state is store in redux this could result in a lot of actions being fired off. 

- It needs to know the current position within the current song. This will definately not be in the player state, instead the track progress bar will be allowed to communicate directly with the audio track to determine its position. 

- It needs to know what the current shuffle setting is.

- It needs to know what the current repeat setting is.

Based on this, a minimal plain data representation could be:

player: {
    isPlaying: {Bool},
    isShuffled: {Bool},
    repeat: {Enum} - NO_REPEAT, TRACK_REPEAT, CONTEXT_REPEAT,
    currentTrack: {String},
    currentContext: {String}
}

This assumes that volume and track position are not in player state.

I think that the track list for the current context, and the shuffled variant of it, should not be kept in redux, since they would only be in redux for the audio elem implementation, and having something only being in redux for one of the implementations is too messy. 



I can depend on the player_state_changed event to update everything from the above list except for currentContext. This is because Spotify do not provide a context when dealing with tracks directly from a users or artists profile (that is, not from an album or playlist). 

So I have to use a seperate action to update the current context. The only time a context changes is when a track is clicked from the app and the SELECT_TRACK action fires (you can't swap contexts from within the player controls for example), so I can just update the context within the SELECT_TRACK_SUCCESS action. 










## How the SDK implementation could work

- To start playing a track, hit the API endpoint https://api.spotify.com/v1/me/player/play. Will need to pass the player id as query param, and at minimum pass a context uri in the body. Investigate how the track uri array and offset values behave.

- Playing and pausing can be achieved by issuing the command to the Player class instance, and then updating state with the data it returns.

- When clicking on a track within the UI, we will look at the track uri and context uri for that track. If both of those match the data in state, then we just need to either pause or play the track (via the Player class instance). If one or both doesn't match, then we need to make a request to the API endpoint with the relevant details (ie the new context uri, tracks uris or offset etc).

- When clicking on the skip to next track or skip to previous track buttons, we just make the request to the player instance. The player instance takes care of all the behaviours for us (determining the right action based on the offset within the curent context, the current repeat and shuffle settings etc). Once the track has been updated the player will emit data that we can use to update the store. 

- To seek a specific place within the current track we just have to make a request to the player instance. 

- To set volume of track we just have to make request to player instance.  

- To toggle shuffle and repeat modes, we just make a request to the player instance, ensuring that the UI is also updated to match.

