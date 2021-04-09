import React from 'react';
import axios from 'axios';

import { Row, Col } from 'react-bootstrap';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            user: null
        };
    }

    getMovies(token) {
        axios.get('https://x-movie-api.herokuapp.com/movies', {
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
                <Row>
                    <Col className='mb-4 mb-md-0' xs={12} md={6}>
                        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                    <Col xs={12} md={6}>
                        <RegistrationView />
                    </Col>
                </Row>
            );
        }

        if (movies.length === 0) {
            return (
                <Row>
                    <Col className='d-flex justify-content-center'>
                        The list is empty!
                    </Col>
                </Row>
            )
        }

        return (
            <Router>
                {/* Home page */}
                <Route exact path='/' render={() => {
                    return (
                        <Row className='main-view row-cols-1 row-cols-md-3'>
                            {movies.map(movie => (
                                <Col className='mb-4' key={movie._id}>
                                    <MovieCard movie={movie} />
                                </Col>
                            ))}
                        </Row>
                    );
                }} />

                {/* Movie details route */}
                <Route exact path='/movies/:movieId' render={({match}) => {
                    return <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                }} />

                {/* Gender details route */}
                <Route exact path='/genres/:name' render={({match}) => {
                    return (
                        <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                    );
                }} />

                {/* Director details route */}
                <Route exact path='/directors/:name' render={({match}) => {
                    if (movies.length === 0) return <div>Empty</div>;
                    return (
                        <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
                    );
                }} />
            </Router>
        );
    }
}
