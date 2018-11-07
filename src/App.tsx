import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class AppRouter extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/foo' component={LoginPage} />
          <Route path='foo/bar' component={LoginPage} />
        </div>
      </Router>
    );
  }
}

interface User {
  email: string;
}

class HomePage extends Component {
  readonly state: {user: User | null} = {user: null};

  componentDidMount() {
    this.fetchUser();
  }

  fetchUser() {
    fetch('/current-user')
      .then((response) => response.json())
      .then((data: {user: User}) => {
        this.setState({user: data.user});
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Kvasir Movies</h1>
          <p>
            {this.state.user != null ? `Hi ${this.state.user.email}! ` : ''}
            Find 🎬 with 👫 :D
          </p>
          <a href='/login'>Log In</a>
        </header>
      </div>
    );
  }
}

class LoginPage extends Component {
  render() {
    return <div>Log in stuff will go here</div>
  }
}

export default AppRouter;
