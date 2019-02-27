import React from 'react';
import PropTypes from 'prop-types';
import Track from '../Track';

export const TrackCollection = props => (
  <ul>
      {props.trackIds.map((trackId, index) => (
          <Track 
            trackId={trackId}
            key={`${trackId}--${index}`}
            useAlbumLayout={props.useAlbumLayout}
            contextId={props.contextId}
            contextURI={props.contextURI}
            includeRemoveTrackButton={props.includeRemoveTrackButton}
          />
      ))}
  </ul>  
);

TrackCollection.propTypes = {
    trackIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    useAlbumLayout: PropTypes.bool,
    includeRemoveTrackButton: PropTypes.bool,
    contextId: PropTypes.string,
    contextURI: PropTypes.string
};
