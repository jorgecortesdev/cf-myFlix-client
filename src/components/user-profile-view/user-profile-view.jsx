require('dotenv').config();

import React, { useEffect } from 'react';
import { Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './user-profile-view.scss';
import axios from 'axios';

export class UserProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
      favorites: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');

    if (accessToken === null) return;

    axios.get(`${process.env.API_URL}/users/${this.props.username}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
      .then(response => {
        let user = response.data;
        this.setState({
          user: user,
          favorites: this.props.movies.filter(m => user.FavoriteMovies.includes(m._id))
        });
      });
  }

  render() {

    if (this.state.user === null) {
      return <div>No user</div>;
    }

    return (
      <Card className='mb-3'>
        <Row className='no-gutters'>
          <Col md={4}>
            <img src="https://via.placeholder.com/300" alt="User Photo" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title as='h5'>{this.state.user.Username}</Card.Title>
              <hr />
              <dl className='row'>
                <dt className='col-md-2 text-nowrap'>Email:</dt>
                <dd className='col-md-10'>{this.state.user.Email}</dd>
                <dt className='col-md-2 text-nowrap'>Birthday:</dt>
                <dd className='col-md-10'>{this.state.user.Birthday}</dd>
              </dl>
              <ListGroup variant='flush' className='mb-md-3' as='ul'>
                {this.state.favorites.map(movie => (<ListGroup.Item key={movie._id} className='pl-0' as='li'><Link to={`/movies/${movie._id}`}>{movie.Title}</Link></ListGroup.Item>))}
              </ListGroup>
              <Link to={'/'}>
                <Button variant='primary'>Back</Button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    )
  }
}

UserProfileView.propTypes = {
  username: PropTypes.string.isRequired
};
