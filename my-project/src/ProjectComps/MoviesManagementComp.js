import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddMovieComp from './AddMovieComp';
import EditMovieComp from './EditMovieComp';
import MoviesComp from './MoviesComp';
import { connect, useSelector } from 'react-redux';

const MoviesManagementComp = () => {
	const [ allowToView, setAllowToView ] = useState('');
	const [ allowToAdd, setAllowToAdd ] = useState('');
	let loggedUser = useSelector(state => state.loggedUser);

	useEffect(() => {
		if (loggedUser.permissions.includes('View Movies')) {
			setAllowToView('inline');
		}
		else {
			setAllowToView('none');
		}
		if (loggedUser.permissions.includes('Create Movies')) {
			setAllowToAdd('inline');
		}
		else {
			setAllowToAdd('none');
		}
	}, []);

	const linkStyle = {
		backgroundColor: 'white',
		color: 'black',
		padding: '5px 5px',
		textAlign: 'center',
		textDecoration: 'none',
		display: 'inline-block',
		marginLeft: '10px',
		marginRight: '10px'
	};

	return (
		<div style={{ marginTop: '20px' }}>
			<div style={{ backgroundColor: 'transparent' }}>
				<Link to="/main/moviesmanagement/allmovies/0" style={{ display: allowToView }} style={linkStyle}>
					All Movies
				</Link>
				<Link to="/main/moviesmanagement/addmovie" style={{ display: allowToAdd }} style={linkStyle}>
					{' '}
					Add Movie
				</Link>
			</div>
			<br />
			<Switch>
				<Route path="/main/moviesmanagement/allmovies/:reload" component={MoviesComp} />
				<Route path="/main/moviesmanagement/addmovie" component={AddMovieComp} />
				<Route path="/main/moviesmanagement/editmovie/:id" component={EditMovieComp} />
			</Switch>
		</div>
	);
};

export default MoviesManagementComp;
