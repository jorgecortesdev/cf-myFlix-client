import React from 'react';
import { Container, Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function GenreView(props) {
  const { genre, movies } = props;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>{ genre.Name }</Card.Title>
          <Card.Text>{ genre.Description }</Card.Text>
          <ListGroup variant='flush' className='mb-md-3' as='ul'>
            {movies.map(movie => (<ListGroup.Item key={movie._id} className='pl-0' as='li'><Link to={`/movies/${movie._id}`}>{movie.Title}</Link></ListGroup.Item>))}
          </ListGroup>
          <Link to={'/'}>
            <Button variant='primary'>Back</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Description: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired
  }).isRequired
};
