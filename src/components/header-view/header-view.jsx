import React from 'react';
import { Navbar, Button, Container } from 'react-bootstrap';

import { LogoSvg } from '../logo-svg/logo-svg';

export function HeaderView(props) {

  const onClick = () => {
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
          <nav className='my-2 my-md-0 mr-md-3'>
            <Button
              type='submit'
              onClick={onClick}
              className='text-light'
            >Logout</Button>
          </nav>
        </Container>
      </Navbar>
    </header>
  );
}
