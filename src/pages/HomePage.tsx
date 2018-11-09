import React, { Component } from 'react';

import logo from '../logo.svg';

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
            <a href='/signup'>Sign Up</a>
            </header>
        </div>
        );
    }
}

export default HomePage;
