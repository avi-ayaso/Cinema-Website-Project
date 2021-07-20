import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UsersManagementComp from './UsersManagementComp';
import { connect, useDispatch, useSelector } from 'react-redux';
import MoviesManagementComp from './MoviesManagementComp';
import SubsManagementComp from './SubsManagementComp';

const MainComp = () => {
	let dispatch = useDispatch();
	const [ admin, setAdmin ] = useState('none');
	let loggedUser = useSelector(state => state.loggedUser);

	useEffect(async () => {
		let users = (await axios.get('http://localhost:8080/users')).data;
		let movies = (await axios.get('http://localhost:8080/movies')).data;
		let members = (await axios.get('http://localhost:8080/members')).data;
		let subscriptions = (await axios.get('http://localhost:8080/subscriptions')).data;
		let action = {
			type: 'INSERT_DATA',
			payload: {
				users: users,
				movies: movies,
				members: members,
				subscriptions: subscriptions
			}
		};
		dispatch(action);
		if (loggedUser.username == 'elad') {
			setAdmin('inline');
		}
	}, []);

	return (
		<div>
			<h3>Hello {loggedUser.firstName},</h3>
			<Link to="/main/moviesmanagement">
				<input type="button" value="Movies" />
			</Link>
			<Link to="/main/subscriptionsmanagement">
				<input type="button" value="Subscriptions" />
			</Link>
			<Link to="/main/usersmanagement">
				<input type="button" style={{ display: admin }} value="Users Managment" />
			</Link>
			<Link to="/">
				<input type="button" value="LogOut" />
			</Link>
			<Switch>
				<Route path="/main/moviesmanagement" component={MoviesManagementComp} />
				<Route path="/main/subscriptionsmanagement" component={SubsManagementComp} />
				<Route path="/main/usersmanagement" component={UsersManagementComp} />
			</Switch>
		</div>
	);
};

export default connect()(MainComp);
