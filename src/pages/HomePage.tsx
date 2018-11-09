import React, { Component } from 'react';

import logo from '../logo.svg';

import SessionInfo from '../types.js'

class HomePage extends Component {
    readonly state: {sessionInfo: SessionInfo | null} = {sessionInfo: null};

    componentDidMount() {
        this.fetchSession()
    }

    fetchSession() {
        fetch('/session')
            .then((response) => response.json())
            .then((data: {sessionInfo: SessionInfo}) => {
              this.setState({sessionInfo: data});
            });
    }

    handleLogout = () => {
      fetch('/logout', {method: 'POST'})
      .then(() => {
        this.setState({user: null});
      });
    }

    render() {
        return (
        <div className="App">
            <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>Kvasir Movies</h1>
            <p>
                {this.state.sessionInfo && this.state.sessionInfo.is_session_active ? `Welcome back, ${this.state.sessionInfo.email}! ` : ''}
                Find 🎬 with 👫 :D
            </p>
            {
              this.state.user ? (
                <button onClick={this.handleLogout}>Log Out</button>
              ) : (
                <>
                  <a href='/login'>Log In</a>
                  <a href='/signup'>Sign Up</a>
                </>
            )}
            </header>
        </div>
        );
    }
}

export default HomePage;
