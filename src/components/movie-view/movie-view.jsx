require('dotenv').config();

import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { setUser } from '../../actions/actions';

import { BookmarkStart } from '../common/icons/BookmarkStart/bookmark-start';
import { BookmarkStartFill } from '../common/icons/BookmarkStartFill/bookmark-start-fill';

export class MovieView extends React.Component {

	isFavorite(id) {
		let favoriteMovies = this.props.user.FavoriteMovies;
		return favoriteMovies.includes(id);
	}

	toggleFavorite(movieId) {
		if (movieId === null) return;

		let { user } = this.props;
		let action = this.isFavorite(movieId) ? 'patch' : 'post';
		let accessToken = localStorage.getItem('token');

		axios[action](`${process.env.API_URL}/users/${user.Username}/movies/${movieId}`, {}, {
				headers: { Authorization: `Bearer ${accessToken}` }
			})
			.then(response => {
				let favoriteMovies = action === 'post'
					? [...user.FavoriteMovies, movieId]
					: user.FavoriteMovies.filter(i => i !== movieId);
				let newUser = { ...user, FavoriteMovies: favoriteMovies };
				this.props.setUser(newUser);
				localStorage.setItem('user', JSON.stringify(newUser));
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		const { movie, user } = this.props;

		if (!movie) return null;

		return (
			<Container>
				<Card className='mb-3'>
					<Row className='no-gutters'>
						<Col md={3} className='d-flex d-md-block justify-content-center mt-4 mt-md-0'>
							<img className='img-fluid' src={movie.ImagePath} alt="Movie Poster" />
						</Col>
						<Col md={9}>
							<Card.Body>
								<div className='d-flex align-items-center'>
									<Card.Title className='flex-grow-1 m-0' as='h5'>{movie.Title}</Card.Title>
									<a href="#" onClick={() => this.toggleFavorite(movie._id)}>{this.isFavorite(movie._id) ? <BookmarkStartFill/> : <BookmarkStart/>}</a>
								</div>
								<hr />
								<Card.Text>{movie.Description}</Card.Text>
								<dl className='row'>
									<dt className='col-md-2 text-nowrap'>Genre:</dt>
									<dd className='col-md-10'><Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link></dd>
									<dt className='col-md-2 text-nowrap'>Director:</dt>
									<dd className='col-md-10'><Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link></dd>
								</dl>
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

let mapStateToProps = state => {
	return {
		user: state.user
	}
};

export default connect(mapStateToProps, { setUser })(MovieView);
