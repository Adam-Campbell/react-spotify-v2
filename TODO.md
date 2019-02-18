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





The player needs to accept these incoming actions, though the implementation of how it processes those actions will differ depending on whether the SDK player or the audio element player is active:

Play track
Pause track
Skip to next track
Skip to previous track
Seek position in current track
Toggle shuffle
Toggle repeat mode

















































Old / additional notes:



web playback sdk



first embed the player script in html:

<script src="https://sdk.scdn.co/spotify-player.js"></script>


Apparently you have to do all of this immediately on page load, so has
to be within an inline script tag:





current strategy for connecting player:

On page load, check for access token in window location, or if not
there then check in local storage. If the token is found in one of 
those places, then we initialize the player with that token.

If the token is not found in either of those places, then the user is
not logged in. In this case the app will be redirecting to Spotifys 
auth service anyway, so just forego the initialization of the player - 
it will be initialized again once spotify redirects back to the app. 






__________________________________________________________________
__________________________________________________________________
__________________________________________________________________


The outwards facing API for the player (the way the rest of the app
will interact with it).


Actions: 

Play track
Pause track
Skip to next track
Skip to previous track
Seek position in track

Toggle repeat mode
Toggle shuffle












____________________________________________________________________
____________________________________________________________________
____________________________________________________________________


Implementation notes



When using the SDK, the only way to tell when a track has changed is to
listen to player_state_changed events emitted by the Player instance. 


So, the player instance will have to be hooked up to fire off redux
actions when a player_state_changed event occurs.



The seeker bar, when using the SDK, will have to be powered by calls
to player.getCurrentState() - a method on the player instance. It 
returns an immediately resolving promise, that contains the player 
information (including track progress), or if the player is not 
successfully connect it will return null.







___________________________________________________________________
___________________________________________________________________
___________________________________________________________________


High level overview of how each method could work.


First, redux:

Redux will store, at a minimum, the current playing state of the 
player (playing or paused), and the current track. 

Redux will NOT hold the current position within the track. 


_________________
  Audio element
_________________


Will have one Audio element, with the src attribute being updated
to reflect the current track. 

The PlayerWrapper class will have hold a reference to this audio
element (actually do i even need to put it in the DOM, or can it just
be in memory?).

Redux will be the single source of truth, so whenever the play/pause
state in redux is updated, the audio element will also be updated to 
match the truth contained within the redux store. 


An event listener will be attached to the audio element, listening for
the end event. When the event fires it will call an action/function
that will determine the correct course of action to take (ie skip to 
next track, stop if end of list reached and no repeat, skip to start
of same track if single repeat is active etc).





_________
   SDK
_________


Again, redux will be the source of truth, and actions will still get
completed by dispatching redux actions. However, instead of interacting
directly with an audio element, we will be making requests to the 
spotify API. 




______________________________________________________________________
______________________________________________________________________
______________________________________________________________________




And now an action-by-action look at how each individual action can 
be achieved in each method:

__________
Play track
__________


Audio elem:

call the play() method on the audio element


SDK:

Call API endpoint


___________
Pause track
___________


Audio elem:

call the pause() method on the audio element


SDK:

Call API endpoint


__________________
Skip to next track
__________________



Audio elem:

Calculate the next track to play based on the context and the repeat
settings. 



SDK:

Call API endpoint


__________________
Skip to prev track
__________________



Audio elem:

Calculate the next track to play based on the context and the repeat
settings, and the position within the current track (once a certain
position is reach it will just skip back to the start of the current
track rather than going back to the previous one). 


SDK:

Call API endpoint


______________________
Seek position in track
______________________


Audio elem:

Update the currentTime property of the audio element.


SDK:

Call API endpoint


______________
Toggle shuffle
______________

Audio elem:

Shuffle the current context/collection within redux (if redux is where
we eventually end up storing the context/collection, which is likely).



SDK:

Call API endpoint


__________________
Toggle repeat mode
__________________


Audio elem:

Toggle the property in redux. 


SDK:


Call API endpoint





_________________________
Dealing with end of track
_________________________

Audio elem:

Listen for when the ended event is emitted by the audio element, and 
then take the appropriate action depending on factors such as the
current repeat settings.




SDK:

The SDK handles moving to the next track, however we have to update
the current track within the redux store by hooking into the change
event emitted by the SDK.











