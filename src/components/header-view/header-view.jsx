import React, { useState, useEffect } from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';

import { LogoSvg } from '../logo-svg/logo-svg';

export function HeaderView(props) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(props.username);
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open('/', '_self');
  }

  return (
    <header>
      <Navbar variant='dark' bg='dark' expand='' className='shadow-sm'>
        <Container className='d-flex justify-content-between'>
          <Navbar.Brand href="/" className='d-flex align-items-center'>
              <LogoSvg />
              <strong>myFlix</strong>
          </Navbar.Brand>
          <div className='my-2 my-md-0 mr-md-3'>
            {username && (
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 flex-row">
                <li className="nav-item ml-3">
                  <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                </li>
                <li className="nav-item ml-3"><span className="nav-link">|</span></li>
                <li className="nav-item ml-3">
                  <a className="nav-link" href={`/users/${username}`}>Welcome, {username}!</a>
                </li>
              </ul>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
}
