import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            user: null
        };

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

    onLoggedIn(authData) {
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    setInitialState() {
        this.setState({
            selectedMovie: null
        });
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

                <Route exact path='/movies/:movieId' render={({match}) => {
                    return (
                        <Row className='justify-content-center'>
                            <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>
                            </Col>
                        </Row>
                    );
                }} />
            </Router>
        );
    }
}
