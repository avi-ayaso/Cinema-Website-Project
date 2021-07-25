import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const MemberRepeaterComp = props => {
	const [ openDiv, setOpenDiv ] = useState(false);
	const [ movieName, setMovieName ] = useState('');
	const [ dateStr, setDateStr ] = useState('');
	const [ member, setMember ] = useState({});
	let moviesArr = useSelector(state => state.movies);
	const [ movies, setMovies ] = useState([]);
	let subsArr = useSelector(state => state.subscriptions);
	const [ subs, setSubs ] = useState([]);

	useEffect(
		() => {
			setMember(props.member);
			setMovies(moviesArr);
			setSubs(subsArr);
		},
		[ props ]
	);

	const deleteMember = async () => {
		try {
			let resp = await axios.delete(`http://localhost:8080/members/${props.member._id}`);
			console.log(resp.data);
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	const openNewMovieDiv = () => {
		if (openDiv == false) {
			setOpenDiv(true);
		}
		else {
			setOpenDiv(false);
		}
	};

	const subToMovie = async () => {
		console.log(dateStr);
		console.log(movieName);
		if (dateStr == '' || movieName == '') {
			alert('One Or More Of the Fields Is Empty!');
			console.log(dateStr);
			console.log(movieName);
		}
		else {
			let memberSubsObj = subs.find(sub => sub.memberId == member._id);
			if (memberSubsObj == undefined) {
				let movieToSub = movies.find(movie => movie.name == movieName);
				let newSub = {
					memberId: member._id,
					movies: [
						{
							movieId: movieToSub._id,
							date: dateStr
						}
					]
				};
				console.log(newSub);
				try {
					await axios.post('http://localhost:8080/subscriptions', newSub);
					setOpenDiv(false);
					props.history.push('/main');
				} catch (error) {
					console.error(error);
				}
			}
			else {
				let memberMoviesArr = memberSubsObj.movies;
				let movieToSub = movies.find(movie => movie.name == movieName);
				let newMovieToArr = {
					movieId: movieToSub._id,
					date: dateStr
				};
				memberMoviesArr.push(newMovieToArr);
				let updatedSub = {
					memberId: member._id,
					movies: memberMoviesArr
				};
				try {
					await axios.put(`http://localhost:8080/subscriptions/${memberSubsObj._id}`, updatedSub);
					setOpenDiv(false);
					props.history.push('/main');
				} catch (error) {
					console.error(error);
				}
			}
		}
	};

	let newMovieDiv = <div />;
	if (openDiv) {
		let memberSubsObj = subs.find(sub => sub.memberId == member._id);
		let moviesSelector;
		if (memberSubsObj == undefined) {
			moviesSelector = movies.map((movie, index) => {
				return (
					<option key={index} value={movie.name}>
						{movie.name}
					</option>
				);
			});
		}
		else {
			let filteredMoviesArr = movies.filter(movie => {
				let subWatched = memberSubsObj.movies.some(memberMovie => memberMovie.movieId == movie._id);
				if (!subWatched) {
					return movie;
				}
			});
			moviesSelector = filteredMoviesArr.map((movie, index) => {
				return (
					<option key={index} value={movie.name}>
						{movie.name}
					</option>
				);
			});
		}
		newMovieDiv = (
			<div>
				<select value={movieName} onChange={e => setMovieName(e.target.value)}>
					<option />
					{moviesSelector}
				</select>
				<input type="date" placeholder="Enter Date" onChange={e => setDateStr(e.target.value)} /> <br />
				<input type="button" value="Subscribe" onClick={subToMovie} />
			</div>
		);
	}

	let sub = subs.find(item => item.memberId == member._id);
	console.log(sub);
	let subMovies = [];

	if (sub !== undefined) {
		subMovies = movies.map(item => {
			let watched = sub.movies.find(movieItem => movieItem.movieId == item._id);
			if (watched !== undefined) {
				let date = new Date(watched.date);
				return <li>{item.name + ', ' + date.toLocaleDateString()}</li>;
			}
		});
	}

	return (
		<div className="member">
			<h3>{props.member.name}</h3> <br />
			<b>Email:</b> {props.member.email} <br />
			<b>City:</b> {props.member.address.city} <br />
			<div>
				<h5>Movies watched:</h5>
				<ul>{subMovies}</ul>
				<br />
				<Button className="repeater-btns" onClick={openNewMovieDiv}>
					Subscribe To A New Movie
				</Button>
				{newMovieDiv}
			</div>
			<Button>
				{' '}
				<Link to={`/main/subscriptionsmanagement/editmember/${props.member._id}`} className="repeater-btns">
					Edit
				</Link>
			</Button>
			<Button className="repeater-btns" onClick={deleteMember}>
				Delete
			</Button>
		</div>
	);
};

export default withRouter(MemberRepeaterComp);
