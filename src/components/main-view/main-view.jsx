require('dotenv').config();

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

import { setMovies, setUser } from '../../actions/actions';

import { MovieCard } from '../movie-card/movie-card';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import MovieView from '../movie-view/movie-view';
import GenreView from '../genre-view/genre-view';
import DirectorView from '../director-view/director-view';
import UserProfileView from '../user-profile-view/user-profile-view';
import UserProfileEdit from '../user-profile-edit/user-profile-edit';

export class MainView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      let user = localStorage.getItem('user');
      this.props.setUser(JSON.parse(user));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get(`${process.env.API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.props.setMovies(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  onLoggedIn(authData) {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user))

    this.props.setUser(authData.user);

    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.props;

    if (Object.keys(user).length === 0) {
      return (
        <Container>
          <Row>
            <Col className='mb-4 mb-md-0' xs={12} md={6}>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            <Col xs={12} md={6}>
              <RegistrationView />
            </Col>
          </Row>
        </Container>
      );
    }

    if (movies.length === 0) {
      return (
        <Container>
          <Row>
            <Col className='d-flex justify-content-center'>The list is empty!</Col>
          </Row>
        </Container>
      )
    }

    return (
      <>
        {/* Home page */}
        <Route exact path='/' render={() => {
          return (
            <Container>
              <Row className='main-view row-cols-1 row-cols-md-3'>
                {movies.map(movie => (
                  <Col className='mb-4' key={movie._id}>
                    <MovieCard movie={movie} />
                  </Col>
                ))}
              </Row>
            </Container>
          );
        }} />

        {/* Movie details route */}
        <Route exact path='/movies/:movieId' render={({match}) => {
          return <MovieView movie={movies.find(m => m._id === match.params.movieId)} />;
        }} />

        {/* Gender details route */}
        <Route exact path='/genres/:name' render={({match}) => {
          return (
            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre}/>
          );
        }} />

        {/* Director details route */}
        <Route exact path='/directors/:name' render={({match}) => {
          return (
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}/>
          );
        }} />

        {/* User Profile */}
        <Route exact path='/profile' component={UserProfileView}/>

        {/* User Profile Edit */}
        <Route exact path='/profile/edit' component={UserProfileEdit} />
      </>
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
