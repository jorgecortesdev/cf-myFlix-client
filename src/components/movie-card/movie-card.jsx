import React from 'react';
import PropTypes from 'prop-types';

export class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        return (
            <div className="movie-card" onClick={() => onClick(movie)}>
                {movie.Title}
            </div>
        );
    }
}

MovieCard.propTypes = {
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
