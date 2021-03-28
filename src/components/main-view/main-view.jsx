import React from 'react';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {

        super();

        this.state = {
            movies: [
                { _id: 1, Title: 'Inception', Description: 'desc1...', ImagePath: '...'},
                { _id: 2, Title: 'The Shawshank Redemption', Description: 'desc2...', ImagePath: '...'},
                { _id: 3, Title: 'Gladiator', Description: 'desc3...', ImagePath: '...'},
            ],
            selectedMovie: null
        };

    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    setInitialState() {
        this.setState({
            selectedMovie: null
        });
    }

    render() {

        const { movies, selectedMovie } = this.state;

        if (movies.length === 0) {
            return <div className="main-view">The list is empty!</div>;
        }

        return (
            <div className="main-view">
                {selectedMovie ? (
                    <MovieView
                        movie={selectedMovie}
                        onClick={() => this.setInitialState()}
                    />
                ) : (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onClick={(movie) => this.onMovieClick(movie)}
                        />
                    ))
                )}
            </div>
        );
    }
}
