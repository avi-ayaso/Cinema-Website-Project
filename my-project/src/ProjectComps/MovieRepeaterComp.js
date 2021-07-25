import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const MovieRepeaterComp = props => {
	const [ subs, setSubs ] = useState([]);
	let subscriptionsArr = useSelector(state => state.subscriptions);
	const [ members, setMembers ] = useState([]);
	let membersArr = useSelector(state => state.members);
	useEffect(() => {
		setSubs(subscriptionsArr);
		setMembers(membersArr);
	}, []);
	const deleteMovie = async () => {
		try {
			await axios.delete(`http://localhost:8080/movies/${props.movie._id}`);
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	let subsData = subs.map(sub => {
		let check = members.find(member => sub.memberId == member._id);
		if (check !== undefined) {
			return { name: check.name, movies: sub.movies };
		}
	});

	let checkIfWatched = subsData.map(subData => {
		let check = subData.movies.find(subMovie => subMovie.movieId == props.movie._id);
		if (check !== undefined) {
			let date = new Date(check.date);
			return <li>{subData.name + ', ' + date.toLocaleDateString()}</li>;
		}
	});

	const [ movieYear, setMovieYear ] = useState(new Date(props.movie.premiered));

	return (
		<div className="movie" style={{ padding: '20px' }}>
			<h4>{props.movie.name + ' ,' + movieYear.getFullYear()}</h4> <br />
			{props.movie.genres.toString()} <br />
			<img src={props.movie.image.medium} style={{ width: '100px', height: '100px' }} alt="" />
			<div>
				<ul>
					<b>Subscriptions watched:</b>
					{checkIfWatched}
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
