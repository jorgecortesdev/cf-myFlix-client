import React from 'react';
import { Container, Card, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './director-view.scss';

export function DirectorView(props) {
  const { director, movies } = props;

  return (
    <Container>
      <Card className='mb-3'>
        <Row className='no-gutters'>
          <Col md={4}>
            <img src="https://via.placeholder.com/300" alt="Director Photo" />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title as='h5'>{director.Name}</Card.Title>
              <small className='mr-2'><strong>Birth:</strong> { director.Birth }</small>
              <small><strong>Death:</strong> { director.Death }</small>
              <hr />
              <Card.Text>{director.Bio}</Card.Text>
              <ListGroup variant='flush' className='mb-md-3' as='ul'>
                {
                  movies.filter(m => m.Director.Name === director.Name)
                    .map(movie => (<ListGroup.Item key={movie._id} className='pl-0' as='li'><Link to={`/movies/${movie._id}`}>{movie.Title}</Link></ListGroup.Item>))
                }
              </ListGroup>
              <Link to={'/'}>
                <Button variant='primary'>Back</Button>
              </Link>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
  }).isRequired
};

let mapStateToProps = state => {
  return {
    movies: state.movies
  }
};

export default connect(mapStateToProps)(DirectorView);
