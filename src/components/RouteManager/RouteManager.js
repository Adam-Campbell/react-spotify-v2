import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import UserProfile from '../UserProfile';
import ArtistProfile from '../ArtistProfile';
import Album from '../Album';
import Playlist from '../Playlist';
import Highlights from '../Highlights';
import Category from '../Category';
import Search from '../Search';
import Auth from '../Auth';
import Nav from '../Nav';
import NavToggle from '../NavToggle';

export const RouteManager = (props) => (
    <React.Fragment>
        <div className="nav-container">
            {props.navIsOpen && <Nav toggleNav={props.toggleNav} />}
        </div>
        <NavToggle 
            navIsOpen={props.navIsOpen}
            toggleNav={props.toggleNav}
        />
        <div className={`main-container ${props.navIsOpen ? 'nav-open' : ''}`}>
            <Switch>

                <Route path="/me" component={UserProfile} />

                <Route 
                    path="/artist/:artistId"
                    render={({match}) => 
                        <ArtistProfile 
                            artistId={match.params.artistId} 
                            url={match.url}
                        />
                    }
                />

                <Route 
                    path="/album/:albumId" 
                    render={({match}) => <Album albumId={match.params.albumId} />}
                />

                <Route 
                    path="/playlist/:playlistId"
                    render={({match}) => <Playlist playlistId={match.params.playlistId} />}
                />

                <Route path="/highlights" component={Highlights} />

                <Route 
                    path="/category/:category"
                    render={({match}) => <Category category={match.params.category} />}
                />

                <Route 
                    path="/search"
                    render={() => <Search />}
                />

                <Route 
                    path="/auth"
                    render={() => <Auth />}
                />

            </Switch>
        </div>
    </React.Fragment>
);

RouteManager.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
}; 
