import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from '../UserProfile';
import ArtistProfile from '../ArtistProfile';
import Album from '../Album';
import Playlist from '../Playlist';
import Highlights from '../Highlights';
import Category from '../Category';
import Search from '../Search';
import Login from '../Login';
import Auth from '../Auth';

export const RouteManager = (props) => (
    <Switch>

        <Route exact path="/" render={() => <Redirect to="/me"/>} />

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
            path="/login"
            render={() => <Login />}
        />

        <Route 
            path="/auth"
            render={() => <Auth />}
        />

    </Switch>
);