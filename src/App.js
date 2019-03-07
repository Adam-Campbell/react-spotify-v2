import React, { Component } from 'react';
import WithAuth from './components/WithAuth';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from './components/UserProfile';
import ArtistProfile from './components/ArtistProfile';
import Album from './components/Album';
import Playlist from './components/Playlist';
import Highlights from './components/Highlights';
import Category from './components/Category';
import NavToggle from './components/NavToggle';
import Nav from './components/Nav';
import Search from './components/Search';
import ScrollToTop from './components/ScrollToTop';
import WithUserInfo from './components/WithUserInfo';
import Modal from './components/Modal';
import Player from './components/Player';
import Login from './components/Login';
import RouteManager from './components/RouteManager';

class App extends Component {

  state = {
    navIsOpen: false
  };

  toggleNav = () => {
    this.setState(prevState => ({
      navIsOpen: !prevState.navIsOpen
    }));
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <ScrollToTop>
            <div className="app-container">
              <div className="nav-container">
                {this.state.navIsOpen && <Nav toggleNav={this.toggleNav} />}
              </div>
              <NavToggle 
                navIsOpen={this.state.navIsOpen}
                toggleNav={this.toggleNav}
              />
              <div className={`main-container ${this.state.navIsOpen ? 'nav-open' : ''}`}>
                <RouteManager />   
              </div>
              <Player navIsOpen={this.state.navIsOpen} />
            </div>
          </ScrollToTop>
          <Modal />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;







/*

return (
        <WithAuth>
          {() => (
            <WithUserInfo>
              {() => (
                <BrowserRouter>
                  <React.Fragment>
                    <ScrollToTop>
                      <div className="app-container">
                        <div className="nav-container">
                          {this.state.navIsOpen && <Nav toggleNav={this.toggleNav} />}
                        </div>
                        <NavToggle 
                          navIsOpen={this.state.navIsOpen}
                          toggleNav={this.toggleNav}
                        />
                        <div className={`main-container ${this.state.navIsOpen ? 'nav-open' : ''}`}>
                          
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
                              
                            </Switch>
                          
                        </div>
                        <Player navIsOpen={this.state.navIsOpen} />
                      </div>
                    </ScrollToTop>
                    <Modal />
                  </React.Fragment>
                </BrowserRouter>
              )}
            </WithUserInfo>
          )}
        </WithAuth> 
    );



*/