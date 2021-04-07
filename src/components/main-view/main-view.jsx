import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();

        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };

    }

    componentDidMount() {
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGYXZvcml0ZU1vdmllcyI6W10sIl9pZCI6IjYwNmE0ZjhiMDYyZTBhMDAxNTM4ODczYyIsIlVzZXJuYW1lIjoiaGVyb2t1IiwiUGFzc3dvcmQiOiIkMmIkMTAkYnI5d2RjdGhhN1EwWnoyemY5U1c3dUVZcWMxTGtnMk1NUy8vVGd2ZFBhc0s4MjRzTEhHRW0iLCJFbWFpbCI6Imhlcm9rdUBteWZsaXguY29tIiwiQmlydGhkYXkiOiIxOTU2LTAyLTE0VDAwOjAwOjAwLjAwMFoiLCJfX3YiOjAsImlhdCI6MTYxNzU3OTkyMSwiZXhwIjoxNjE4MTg0NzIxLCJzdWIiOiJoZXJva3UifQ.2SRCbqmcIFFK0bEYyhcbMBXUhyd5M10phiQFmSmbtIs';

        axios.get('https://x-movie-api.herokuapp.com/movies', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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

    setSelectedMovie(newSelectedMovie) {
        this.state({
            selectedMovie: newSelectedMovie
        });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(user) {
        this.setState({
            user
        });
    }

    setInitialState() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {
        const { movies, selectedMovie, user } = this.state;

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
            <>
                {selectedMovie
                ? (
                    <Row className='justify-content-center'>
                        <Col md={8}>
                            <MovieView
                                movie={selectedMovie}
                                onClick={() => this.setInitialState()}
                            />
                        </Col>
                    </Row>
                ) :
                <Row className='main-view row-cols-1 row-cols-md-3'>
                    {movies.map(movie => (
                        <Col className='mb-4' key={movie._id}>
                            <MovieCard
                                movie={movie}
                                onClick={movie => this.onMovieClick(movie)}
                            />
                        </Col>
                    ))}
                </Row>
                }
            </>
        );
    }
}
