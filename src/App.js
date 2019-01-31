import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WithAuth from './components/WithAuth';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import ArtistProfile from './components/ArtistProfile';
import Album from './components/Album';
import Playlist from './components/Playlist';
import Highlights from './components/Highlights';

class App extends Component {
  render() {
    return (
      <WithAuth>
        {() => (
          <BrowserRouter>
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
            </Switch>
          </BrowserRouter>
        )}
      </WithAuth>
    );
  }
}

export default App;
