import React from 'react';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} alt="Poster"/>
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>
                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>
                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>
                <button onClick={() => onClick()}>Back</button>
            </div>
        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Actors: PropTypes.array.isRequired,
        Description: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Bio: PropTypes.string.isRequired,
            Birth: PropTypes.string.isRequired,
            Death: PropTypes.string.isRequired,
            Name: PropTypes.string.isRequired,
        }).isRequired,
        Featured: PropTypes.bool.isRequired,
        Genre: PropTypes.shape({
            Description: PropTypes.string.isRequired,
            Name: PropTypes.string.isRequired
        }).isRequired,
        ImagePath: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
