import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify, faGithub } from '@fortawesome/free-brands-svg-icons';
import Button from '../Button';
import { buttonThemes } from '../../constants';
import HighlightsGraphic from '../../highlights-graphic.png';
import PlayerGraphic from '../../player-graphic.png';
import ProfileGraphic from '../../profile-graphic.png';

const Landing = ({ handleLoginRedirect }) => (
    <main className="landing">
        <header className="landing-header">
            <FontAwesomeIcon icon={faSpotify} />
            <h1 className="heading heading--large heading--white">Reactify</h1>
            <p className="landing-header__tagline">A Spotify web client built with React and Redux.</p>
            <Button 
                text="Login via Spotify"
                handleClick={handleLoginRedirect}
                theme={buttonThemes.white}
            />
        </header>
        <section className="app-feature app-feature--1">
            <img
                className="highlights-image"
                src={HighlightsGraphic}
                alt="A screenshot of the highlights view of this application"
            />
            <div className="app-feature__text-container app-feature__text-container--1">
                <div>
                    <h2 className="heading">Full Spotify Access</h2>
                    <span className="app-feature__heading-underline"></span>
                </div>
                <p className="app-feature__description">
                    Browse the curated list of new releases and featured playlists, or search for a specific artist, album or playlist - you have full access to Spotifys vast music library.
                </p>
            </div>
        </section>
        <section className="app-feature app-feature--2">
            <div className="app-feature__text-container app-feature__text-container--2">
                <div>
                    <h2 className="heading">Polymorphic Player</h2>
                    <span className="app-feature__heading-underline"></span>
                </div>
                <p className="app-feature__description">
                    The built in music player utilises Spotifys Web Playback SDK, when available, to facilitate the streaming of complete tracks. When the environment is not compatible with the SDK however, the player will fall back to using the 30 second track previews to maintain the best listening experience possible. 
                </p>
            </div>
            <img
                className="player-image"
                src={PlayerGraphic}
                alt="A screenshot of the music player included in the app"
            />
        </section>
        <section className="app-feature app-feature--3">
            <img
                className="profile-image"
                src={ProfileGraphic}
                alt="A screenshot of an artist profile within the app"
            />
            <div className="app-feature__text-container app-feature__text-container--3">
                <div>
                    <h2 className="heading">Personalize Your Experience</h2>
                    <span className="app-feature__heading-underline"></span>
                </div>
                <p className="app-feature__description">
                    Follow and unfollow artists or playlists. Create new playlists. Update your existing playlists by adding or removing tracks and changing the playlists name or cover image.  Reactify gives you the tools to make the experience your own. 
                </p>
            </div>
        </section>
        <footer className="landing-footer">
            <FontAwesomeIcon icon={faGithub} />
            <a 
                className="landing-footer__link" 
                href="https://github.com/Adam-Campbell/react-spotify-v2"
            >View on Github</a>
        </footer>
    </main>
);

Landing.propTypes = {
    handleLoginRedirect: PropTypes.func.isRequired
};

export default Landing;