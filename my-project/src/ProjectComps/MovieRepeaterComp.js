import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const MovieRepeaterComp = props => {
	const deleteMovie = async () => {
		await axios.delete(`http://localhost:8080/movies/${props.movie._id}`);
		window.location.reload();
	};
	const [ movieYear, setMovieYear ] = useState(new Date(props.movie.premiered));

	const btnStyle = {
		backgroundColor: 'transparent',
		color: 'black',
		padding: '5px 5px',
		textAlign: 'center',
		textDecoration: 'none',
		display: 'inline-block',
		marginLeft: '10px',
		marginRight: '10px'
	};

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
				<Link to={`/main/moviesmanagement/editmovie/${props.movie._id}`} style={btnStyle}>
					Edit
				</Link>
			</Button>
			<Button style={btnStyle} onClick={deleteMovie}>
				Delete
			</Button>
		</div>
	);
};

export default withRouter(MovieRepeaterComp);
