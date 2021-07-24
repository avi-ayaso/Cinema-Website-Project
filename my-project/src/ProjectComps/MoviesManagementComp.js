import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddMovieComp from './AddMovieComp';
import EditMovieComp from './EditMovieComp';
import MoviesComp from './MoviesComp';
import { useSelector } from 'react-redux';

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

	return (
		<div style={{ marginTop: '20px' }}>
			<div style={{ backgroundColor: 'transparent' }}>
				<Link to="/main/moviesmanagement/allmovies/0" className="managment-btns" style={{ display: allowToView }}>
					All Movies
				</Link>
				<Link to="/main/moviesmanagement/addmovie" className="managment-btns" style={{ display: allowToAdd }}>
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
