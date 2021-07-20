import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const MemberRepeaterComp = props => {
	const [ openDiv, setOpenDiv ] = useState(false);
	const [ movieName, setMovieName ] = useState('');
	const [ dateStr, setDateStr ] = useState('');
	const [ member, setMember ] = useState({});

	useEffect(
		() => {
			setMember(props.member);
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
		let moviesArr = props.data.movies;
		let subsArr = props.data.subscriptions;
		let memberSubsObj = subsArr.find(sub => sub.memberId == member._id);
		let filteredMoviesArr = moviesArr.filter(movie => {
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

	return (
		<div>
			<b>{props.member.name}</b> <br />
			Email: {props.member.email} <br />
			City: {props.member.address.city} <br />
			<Link to={`/main/subscriptionsmanagement/editmember/${props.member._id}`}>
				<input type="button" value="Edit" />
			</Link>
			<input type="button" value="Delete" onClick={deleteMember} />
			<div>
				<h5>Movies watched:</h5>
				<input type="button" value="Subscribe To A New Movie" onClick={openNewMovieDiv.bind(this)} />
				{newMovieDiv}
				<ul />
			</div>
		</div>
	);
};

export default withRouter(connect()(MemberRepeaterComp));
