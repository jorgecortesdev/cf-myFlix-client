import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { LogoSvg } from '../common/icons/LogoSvg/logo-svg';
import { setUser } from '../../actions/actions';

export function HeaderView(props) {

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    props.setUser({});
    window.open('/', '_self');
  }

  const { user } = props;

  return (
    <header>
      <Navbar variant='dark' bg='dark' expand='' className='shadow-sm'>
        <Container className='d-flex justify-content-between'>
          <LinkContainer to="/">
            <Navbar.Brand className='d-flex align-items-center'>
                <LogoSvg />
                <strong>myFlix</strong>
            </Navbar.Brand>
          </LinkContainer>
          <div className='my-2 my-md-0 mr-md-3'>
            {Object.keys(user).length !== 0 && (
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0 flex-row">
                <li className="nav-item ml-3">
                  <a className="nav-link" href="#" onClick={handleLogout}>Logout</a>
                </li>
                <li className="nav-item ml-3"><span className="nav-link">|</span></li>
                <li className="nav-item ml-3">
                  <Link to={'/profile'} className='nav-link'>Welcome, {user.Username}!</Link>
                </li>
              </ul>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

let mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { setUser })(HeaderView);
