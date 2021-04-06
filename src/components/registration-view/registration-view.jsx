import React, { useState } from 'react';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        console.log(username, password, email, birthday);
    };

    return (
        <div>
            <h1>Registration Form</h1>
            <form>
                <label>Username:</label>
                <input
                    type='text'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                />

                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={e => setPassword(e.target.value)}
                    required
                />

                <label>Birthday:</label>
                <input
                    type="text"
                    value={birthday}
                    onChange={event => setBirthday(event.target.value)}
                />

                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}
