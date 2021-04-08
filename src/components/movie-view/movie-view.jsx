import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <Card className='movie-view'>
                <Card.Img
                    variant='top'
                    className="movie-poster"
                    src={movie.ImagePath}
                    alt="Poster"
                />
                <Card.Body>
                    <Card.Title className="movie-title">{movie.Title}</Card.Title>
                    <Card.Text className="movie-description">
                        {movie.Description}
                    </Card.Text>
                    <div>
                        <span className="label">Genre: </span>
                        <span className="value">
                            <Link to={`/genres/${movie.Genre.Name}`}>
                                {movie.Genre.Name}
                            </Link>
                        </span>
                    </div>
                    <div className='mb-3'>
                        <span className="label">Director: </span>
                        <span className="value">
                            <Link to={`/directors/${movie.Director.Name}`}>
                                {movie.Director.Name}
                            </Link>
                        </span>
                    </div>
                    <Link to={'/'}>
                        <Button variant='primary'>Back</Button>
                    </Link>
                </Card.Body>
            </Card>
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
    }).isRequired
};
