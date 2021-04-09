import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {
	render() {
		const { movie, onClick } = this.props;

		if (!movie) return null;

		return (
			<Card className='mb-3'>
				<Row className='no-gutters'>
					<Col md={3} className='d-flex d-md-block justify-content-center mt-4 mt-md-0'>
						<img className='img-fluid' src={movie.ImagePath} alt="Movie Poster" />
					</Col>
					<Col md={9}>
						<Card.Body>
							<Card.Title as='h5'>{movie.Title}</Card.Title>
							<hr />
							<Card.Text>{movie.Description}</Card.Text>
							<Card.Text>
								<dl className='row'>
									<dt className='col-md-2 text-nowrap'>Genre:</dt>
									<dd className='col-md-10'><Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></dd>
									<dt className='col-md-2 text-nowrap'>Director:</dt>
									<dd className='col-md-10'><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></dd>
								</dl>
							</Card.Text>
							<Link to={'/'}>
								<Button variant='primary'>Back</Button>
							</Link>
						</Card.Body>
					</Col>
				</Row>
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
