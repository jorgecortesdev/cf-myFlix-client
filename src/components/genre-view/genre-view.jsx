import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function GenreView(props) {
  const { genre } = props;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{ genre.Name }</Card.Title>
        <Card.Text>{ genre.Description }</Card.Text>
        <Link to={'/'}>
          <Button variant='primary'>Back</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Description: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired
  }).isRequired
};
