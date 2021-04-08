import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;

        return (
            <Card className='h-100'>
                <Card.Img variant='top' src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Description}</Card.Text>
                </Card.Body>
                <Card.Footer className='text-right'>
                    <Link to={`/movies/${movie._id}`}>
                        <Button variant='primary'>Open</Button>
                    </Link>
                </Card.Footer>
            </Card>
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
    }).isRequired
};
