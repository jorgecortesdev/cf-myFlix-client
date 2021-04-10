require('dotenv').config();

import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleRegister = event => {
        event.preventDefault();

        axios.post(`${process.env.API_URL}/users`, {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
            .then(response => {
                const { data } = response;
                console.log(data);
                window.open('/', '_self');
            })
            .catch(error => {
                console.log('error registering the user');
            });
    };

    return (
        <Card className='border-primary'>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <h2>Create account</h2>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type='text'
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type='password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type='email'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type='text'
                            value={birthday}
                            onChange={event => setBirthday(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            onClick={handleRegister}
                            block
                            size='lg'
                            >Create your account</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}
