import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import Auth from '../Auth';
import Nav from '../Nav';
import NavToggle from '../NavToggle';
import { Loader } from '../Loaders';

// Routes are imported within calls to lazy to allow for code splitting at the route level. Each route has its
// own JS bundle that isn't loaded until needed.
const UserProfile = lazy(() => import('../UserProfile'));
const ArtistProfile = lazy(() => import('../ArtistProfile'));
const Album = lazy(() => import('../Album'));
const Playlist = lazy(() => import('../Playlist'));
const Highlights = lazy(() => import('../Highlights'));
const Category = lazy(() => import('../Category'));
const Search = lazy(() => import('../Search'));

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
            <Suspense fallback={<Loader/>}>
                <Switch>

                    <Route path="/me" render={() => <UserProfile/>} />

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

                    <Route path="/highlights" render={() => <Highlights/>} />

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
            </Suspense>
        </div>
    </React.Fragment>
);

RouteManager.propTypes = {
    navIsOpen: PropTypes.bool.isRequired,
    toggleNav: PropTypes.func.isRequired
}; 
