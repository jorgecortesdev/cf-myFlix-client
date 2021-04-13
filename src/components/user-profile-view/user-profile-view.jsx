import React from 'react';
import { connect } from 'react-redux';
import { Container, Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Settings as SettingsIcon } from '../common/icons/Settings/settings'

import './user-profile-view.scss';

export class UserProfileView extends React.Component {

  render() {
    const { movies, user } = this.props;

    return (
      <Container>
        <Card className='user-profile mb-3'>
          <Row className='no-gutters'>
            <Col md={4}>
              <img src="https://via.placeholder.com/300" alt="User Photo" />
            </Col>
            <Col md={8}>
              <Card.Body>
                <div className='d-flex align-items-center user-profile__title'>
                  <Card.Title className='flex-grow-1 m-0' as='h5'>{user.Username}</Card.Title>
                  <Link to={`/profile/edit`}>
                    <Button size='sm' variant='primary'><SettingsIcon/> Edit</Button>
                  </Link>
                </div>
                <hr />
                <dl className='row'>
                  <dt className='col-md-2 text-nowrap'>Email:</dt>
                  <dd className='col-md-10'>{user.Email}</dd>
                  <dt className='col-md-2 text-nowrap'>Birthday:</dt>
                  <dd className='col-md-10'>{user.Birthday}</dd>
                </dl>
                <ListGroup variant='flush' className='mb-md-3' as='ul'>
                  {
                    movies.filter(m => user.FavoriteMovies.includes(m._id))
                      .map(movie => (<ListGroup.Item key={movie._id} className='pl-0' as='li'><Link to={`/movies/${movie._id}`}>{movie.Title}</Link></ListGroup.Item>))
                  }
                </ListGroup>
                <Link to={'/'}>
                  <Button variant='primary'>Back</Button>
                </Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
      </Container>
    )
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
};

export default connect(mapStateToProps)(UserProfileView);
