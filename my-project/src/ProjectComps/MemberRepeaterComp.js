import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
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
		let resp = await axios.delete(`http://localhost:8080/members/${props.member._id}`);
		console.log(resp);
		window.location.reload();
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
		if (dateStr == '' || movieName == '') {
			alert('One Or More Of the Fields Is Empty!');
			console.log(dateStr);
			console.log(movieName);
		}
		else {
			let movieId = props.data.movies.find(item => item.name == movieName);
			let newSub = {
				memberId: member._id,
				movies: [
					{
						movieId: movieId._id,
						date: dateStr
					}
				]
			};
			console.log(newSub);
			await axios.post('http://localhost:8080/subscriptions', newSub);
			let allSubs = (await axios.get('http://localhost:8080/movies')).data;
			let newSubId = allSubs[allSubs.length - 1]._id;
			let addToStore = {
				id: newSubId,
				memberId: member._id,
				movies: [
					{
						movieId: movieId,
						date: dateStr
					}
				]
			};
			let action = {
				type: 'ADD_SUB',
				payload: addToStore
			};
			props.dispatch(action);
		}
	};

	let newMovieDiv = <div />;
	if (openDiv) {
		let memberSubsObj = subs.find(sub => sub.memberId == member._id);
		let filteredMoviesArr = movies.filter(movie => {
			let check = memberSubsObj.movies.every(memberMovie => memberMovie.movieId == movie._id);
			if (!check) {
				return movie;
			}
		});
		let moviesObj = filteredMoviesArr.map((movie, index) => {
			return (
				<option key={index} value={movie.name}>
					{movie.name}
				</option>
			);
		});
		newMovieDiv = (
			<div>
				Add A New Movie <br />
				<select value={movieName} onChange={e => setMovieName(e.target.value)}>
					<option />
					{moviesObj}
				</select>
				<input type="text" placeholder="Enter Date" onChange={e => setDateStr(e.target.value)} /> <br />
				<input type="button" value="Subscribe" onClick={subToMovie} />
			</div>
		);
	}

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
		<div>
			<h3>{props.member.name}</h3> <br />
			<b>Email:</b> {props.member.email} <br />
			<b>City:</b> {props.member.address.city} <br />
			<div>
				<h5>Movies watched:</h5>
				<Button style={btnStyle} onClick={openNewMovieDiv.bind(this)}>
					Subscribe To A New Movie
				</Button>
				{/* <input type="button" value="Subscribe To A New Movie" onClick={openNewMovieDiv.bind(this)} /> */}
				{newMovieDiv}
				<ul />
			</div>
			{/* <Link to={`/main/subscriptionsmanagement/editmember/${props.member._id}`}>
				<input type="button" value="Edit" />
			</Link> */}
			<Button>
				{' '}
				<Link to={`/main/subscriptionsmanagement/editmember/${props.member._id}`} style={btnStyle}>
					Edit
				</Link>
			</Button>
			<Button style={btnStyle} onClick={deleteMember}>
				Delete
			</Button>
			{/* <div>
				<h5>Movies watched:</h5>
				<Button style={btnStyle} onClick={openNewMovieDiv.bind(this)}>
					Subscribe To A New Movie
				</Button>
				<input type="button" value="Subscribe To A New Movie" onClick={openNewMovieDiv.bind(this)} />
				{newMovieDiv}
				<ul />
			</div> */}
		</div>
	);
};

export default withRouter(connect()(MemberRepeaterComp));
