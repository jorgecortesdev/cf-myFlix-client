require('dotenv').config();

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        /* Send a request to the server for authentication */
        axios.post(`${process.env.API_URL}/login`, {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(event => {
            console.log('no such user');
        });
    };

    return (
        <Card className='border-primary'>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <h2>Login</h2>
                    </Form.Group>

                    <Form.Group controlId='formUsername'>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type='text'
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            placeholder='Enter username'
                        />
                    </Form.Group>

                    <Form.Group controlId='formPassword'>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            placeholder='Password'
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button
                            type='submit'
                            onClick={handleSubmit}
                            block
                            size='lg'
                        >Submit</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}

LoginView.propTypes = {
    onLoggedIn: PropTypes.func.isRequired
}
