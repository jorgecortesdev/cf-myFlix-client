import React, { useState } from 'react';
import { Row, Col, Form, Card, Button } from 'react-bootstrap';

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
                            onChange={e => setPassword(e.target.value)}
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
                            onClick={handleSubmit}
                            block
                            size='lg'
                            >Create your account</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
    );
}
