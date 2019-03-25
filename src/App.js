import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
    // For the exact path '/' render Landing component (which will redirect to /me if there is a logged in user), 
    //for all other paths delegate to the RouteManager component.
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
