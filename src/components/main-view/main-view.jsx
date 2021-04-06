import React from 'react';
import axios from 'axios';

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
        axios.get('https://x-movie-api.herokuapp.com/movies')
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
                <>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    <RegistrationView />
                </>
            );
        }

        if (selectedMovie) {
            return (
                <MovieView movie={selectedMovie} onClick={() => this.setInitialState()}/>
            );
        }

        if (movies.length === 0) {
            return <div className="main-view">The list is empty!</div>;
        }

        return (
            <div className="main-view">
                {movies.map(movie => (
                    <MovieCard
                        key={movie._id}
                        movie={movie}
                        onClick={movie => this.onMovieClick(movie)}
                    />
                ))}
            </div>
        );
    }
}
