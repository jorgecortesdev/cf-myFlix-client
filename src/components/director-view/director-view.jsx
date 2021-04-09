import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './director-view.scss';

export function DirectorView(props) {
  const { director } = props;

  return (
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
            <Link to={'/'}>
              <Button variant='primary'>Back</Button>
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
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
