import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    return (
        <div>
            <h1>Login</h1>
            <form>
                <label>Username:</label>
                <input
                    type='text'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}
