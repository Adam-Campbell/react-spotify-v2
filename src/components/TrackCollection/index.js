import React from 'react';
import PropTypes from 'prop-types';
import Track from '../Track';

const TrackCollection = props => (
  <ul>
      {props.trackIds.map((trackId, index) => (
          <Track 
            trackId={trackId}
            key={`${trackId}--${index}`}
            useAlbumLayout={props.useAlbumLayout}
          />
      ))}
  </ul>  
);

TrackCollection.propTypes = {
    trackIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    useAlbumLayout: PropTypes.bool
};

export default TrackCollection;

