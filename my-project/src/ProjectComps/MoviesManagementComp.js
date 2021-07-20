import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddMovieComp from './AddMovieComp';
import EditMovieComp from './EditMovieComp';
import MoviesComp from './MoviesComp';
import { connect, useSelector } from 'react-redux';

const MoviesManagementComp = props => {
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
		<div>
			<h3>Movies</h3>
			<Link to="/main/moviesmanagement/allmovies/0">
				<input type="button" style={{ display: allowToView }} value="All Movies" />
			</Link>
			<Link to="/main/moviesmanagement/addmovie">
				<input type="button" style={{ display: allowToAdd }} value="Add Movie" />
			</Link>
			<br /> <br />
			<Switch>
				<Route path="/main/moviesmanagement/allmovies/:reload" component={MoviesComp} />
				<Route path="/main/moviesmanagement/addmovie" component={AddMovieComp} />
				<Route path="/main/moviesmanagement/editmovie/:id" component={EditMovieComp} />
			</Switch>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		data: state
	};
};

export default connect(mapStateToProps)(MoviesManagementComp);
