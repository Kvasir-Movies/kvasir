import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact component={HomePage} />
          <Route path='/login' component={LoginPage} />
        </div>
      </Router>
    );
  }
}

export default App;
