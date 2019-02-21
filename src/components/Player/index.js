import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from '@fortawesome/free-solid-svg-icons';
import PlayerTrackInfo from './PlayerTrackInfo';
import PlayerControls from './PlayerControls';
import PlayerVolumeControl from './PlayerVolumeControl';
import PlayerAudioElement from './PlayerAudioElement';

class Player extends Component {
    render() {
        return (
            <section className="player">
                <div className="player__inner-container">
                    <FontAwesomeIcon icon={faCaretUp} />
                    <PlayerTrackInfo />
                    <PlayerControls />
                    <PlayerVolumeControl />
                    <PlayerAudioElement />
                </div>
            </section>
        );
    }
}

const mapStateToProps = (state) => ({

});

export default connect(mapStateToProps)(Player);