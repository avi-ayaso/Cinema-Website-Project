import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const MovieRepeaterComp = props => {
	const deleteMovie = async () => {
		try {
			await axios.delete(`http://localhost:8080/movies/${props.movie._id}`);
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	const [ movieYear, setMovieYear ] = useState(new Date(props.movie.premiered));

	return (
		<div style={{ padding: '20px' }}>
			<h4>{props.movie.name + ' ,' + movieYear.getFullYear()}</h4> <br />
			<b>Genres:</b> {props.movie.genres.toString()} <br />
			<img src={props.movie.image.medium} style={{ width: '100px', height: '100px' }} alt="" />
			<div>
				<ul>
					<b>Subscriptions watched:</b>
				</ul>
			</div>
			<br /> <br />
			<Button>
				{' '}
				<Link to={`/main/moviesmanagement/editmovie/${props.movie._id}`} className="repeater-btns">
					Edit
				</Link>
			</Button>
			<Button className="repeater-btns" onClick={deleteMovie}>
				Delete
			</Button>
		</div>
	);
};

export default withRouter(MovieRepeaterComp);
