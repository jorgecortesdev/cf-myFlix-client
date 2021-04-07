import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';

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
        <Card className='border-primary'>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <h2>Login</h2>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type='text'
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
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
