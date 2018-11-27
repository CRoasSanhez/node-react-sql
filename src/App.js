import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AlbumsComponent from './components/AlbumsComponent';
import CountryComponent from './components/CountryComponent';
import UsersComponent from './components/UsersComponent';
import TracksComponent from './components/TracksComponent';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">Challenge3</a>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/tracks'} className="nav-link">Tracks</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/albums'} className="nav-link">Albums</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/country'} className="nav-link">Country</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/users'} className="nav-link">Users</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Switch>
            <Route path='/tracks' component={TracksComponent} />
            <Route exact path='/albums' component={AlbumsComponent} />
            <Route path='/country' component={CountryComponent} />
            <Route path='/users' component={UsersComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;