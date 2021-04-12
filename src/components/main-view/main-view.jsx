require('dotenv').config();

import React from 'react';
import axios from 'axios';

import { Row, Col, Container } from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { UserProfileView } from '../user-profile-view/user-profile-view';
import { UserProfileEdit } from '../user-profile-edit/user-profile-edit';

export class MainView extends React.Component {

  constructor() {
    super();

    this.state = {
    movies: [],
    user: null
    };
  }

  getMovies(token) {
    axios.get(`${process.env.API_URL}/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    this.setState({
      user: authData.user.Username
    });

    this.props.onLoggedIn(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);

    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    if (!user) {
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
      <Router>
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
            <GenreView
              genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
              movies={movies.filter(m => m.Genre.Name === match.params.name)}
            />
          );
        }} />

        {/* Director details route */}
        <Route exact path='/directors/:name' render={({match}) => {
          if (movies.length === 0) return <div>Empty</div>;
          return (
            <DirectorView
              director={movies.find(m => m.Director.Name === match.params.name).Director}
              movies={movies.filter(m => m.Director.Name === match.params.name)}
            />
          );
        }} />

        {/* User Profile */}
        <Route exact path='/users/:name' render={({ match }) => {
          return <UserProfileView username={match.params.name} movies={movies}/>;
        }} />

        {/* User Profile Edit */}
        <Route exact path='/users/:name/edit' render={({ match }) => {
          return <UserProfileEdit username={match.params.name}/>;
        }} />
      </Router>
    );
  }
}
