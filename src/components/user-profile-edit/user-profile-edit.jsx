require('dotenv').config();

import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export function UserProfileEdit(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  useEffect(() => {
    let accessToken = localStorage.getItem('token');

    axios.get(`${process.env.API_URL}/users/${props.username}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(({data}) => {
        setUsername(data.Username);
        setEmail(data.Email);
        setBirthday((new Date(data.Birthday)).toISOString().split('T')[0]);
      });
  }, [])

  function handleSubmit(event) {
    event.preventDefault();

    let data = {};
    let accessToken = localStorage.getItem('token');

    if (username != '') data.Username = username;
    if (password != '') data.Password = password;
    if (email != '') data.Email = email;
    if (birthday != '') data.Birthday = birthday;

    axios.patch(`${process.env.API_URL}/users/${props.username}`, data, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(({ data }) => {
        setUsername(data.Username);
        setPassword('');
        setEmail(data.Email);
        setBirthday((new Date(data.Birthday)).toISOString().split('T')[0]);
        console.log('updated');
      });
  }

  function deleteAccount(e) {
    let accessToken = localStorage.getItem('token');

    axios.delete(`${process.env.API_URL}/users/${props.username}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(({ data }) => {
        console.log(data);
    });

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.open('/', '_self');
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='text' value={email} onChange={e => setEmail(e.target.value)} required/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Birthday</Form.Label>
          <Form.Control type='text' value={birthday} onChange={e => setBirthday(e.target.value)} required/>
        </Form.Group>
        <Form.Group className='d-flex'>
          <div className="flex-grow-1">
            <Button type='submit'>Submit</Button>
          </div>
          <Button type='button' variant='danger' onClick={deleteAccount}>Delete Account</Button>
        </Form.Group>
      </Form>
    </Container>
  )
}
