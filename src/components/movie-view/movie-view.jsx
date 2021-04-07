import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';

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

                        <span className="label">Genre: </span>
                        <span className="value">{movie.Genre.Name}</span>

                        <span className="label">Director: </span>
                        <span className="value">{movie.Director.Name}</span>
                    </Card.Text>
                    <Button
                        variant='primary'
                        onClick={() => onClick()}
                    >Back</Button>
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
    }).isRequired,
    onClick: PropTypes.func.isRequired
};
