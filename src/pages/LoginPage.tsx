import React, { Component } from 'react';

class LoginPage extends Component {
    render() {
        // TODO: Redirect home after submission
        return(
            <form method="POST">
                Email: <input type="text" name="email" /><br/>
                Password: <input type="password" name="password" /><br/>
                <input type="submit" value="Submit" /><br/>
            </form>
        );
    }
}

export default LoginPage;
