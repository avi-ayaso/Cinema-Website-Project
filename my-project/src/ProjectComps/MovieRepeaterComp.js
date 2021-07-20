import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const MovieRepeaterComp = props => {
	const deleteMovie = async () => {
		await axios.delete(`http://localhost:8080/movies/${props.movie._id}`);
		window.location.reload();
	};
	const [ movieYear, setMovieYear ] = useState(new Date(props.movie.premiered));
	return (
		<div>
			<b>{props.movie.name + ' ,' + movieYear.getFullYear()}</b> <br />
			genres: {props.movie.genres.toString()} <br />
			<img src={props.movie.image.medium} style={{ width: '20px', height: '40px' }} alt="" />
			<div>
				<ul>Subscriptions watched:</ul>
			</div>
			<br /> <br />
			<Link to={`/main/moviesmanagement/editmovie/${props.movie.id}`}>
				<input type="button" value="Edit" />
			</Link>
			<input type="button" value="Delete" onClick={deleteMovie} />
		</div>
	);
};

export default withRouter(connect()(MovieRepeaterComp));
