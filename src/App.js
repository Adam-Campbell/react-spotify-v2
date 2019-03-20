import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavToggle from './components/NavToggle';
import Nav from './components/Nav';
import Modal from './components/Modal';
import Player from './components/Player';
import RouteManager from './components/RouteManager';
import Landing from './components/Landing';
import ScrollToTop from './components/ScrollToTop';

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
    // For the exact path '/' render Landing component, for all other paths delegate to the 
    // RouteManager component.
    return (
      <BrowserRouter>
        <ScrollToTop>
          <React.Fragment>
            <div className="app-container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/" render={() => (
                  <RouteManager 
                    navIsOpen={this.state.navIsOpen}
                    toggleNav={this.toggleNav}
                  />
                )}/>
              </Switch>   
              <Player navIsOpen={this.state.navIsOpen} />
            </div>
            <Modal />
          </React.Fragment>
        </ScrollToTop>
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