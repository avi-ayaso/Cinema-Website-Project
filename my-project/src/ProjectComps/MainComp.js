import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UsersManagementComp from './UsersManagementComp';
import { connect, useDispatch, useSelector } from 'react-redux';
import MoviesManagementComp from './MoviesManagementComp';
import SubsManagementComp from './SubsManagementComp';
import { AppBar, Button, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import e from 'express';

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

	const useStyles = makeStyles(theme => ({
		navigationBtn: {
			marginLeft: 'auto',
			marginRight: 'auto'
		},
		navigationBar: {
			backgroundColor: '#B0C4DE'
		}
	}));

	const classes = useStyles();

	return (
		<div>
			<h3>Hello {loggedUser.firstName},</h3>
			<AppBar position="static">
				<Toolbar className={classes.navigationBar}>
					<Button className={classes.navigationBtn} color="inherit">
						<Link to="/main/moviesmanagement">Movies</Link>
					</Button>
					<Button className={classes.navigationBtn} color="inherit">
						<Link to="/main/subscriptionsmanagement">Subscriptions</Link>
					</Button>
					<Button className={classes.navigationBtn} style={{ display: admin }} color="inherit">
						<Link to="/main/usersmanagement">Users Managment</Link>
					</Button>
					<Button className={classes.navigationBtn} color="inherit">
						<Link to="/">LogOut</Link>
					</Button>
				</Toolbar>
			</AppBar>

			<Switch>
				<Route path="/main/moviesmanagement" component={MoviesManagementComp} />
				<Route path="/main/subscriptionsmanagement" component={SubsManagementComp} />
				<Route path="/main/usersmanagement" component={UsersManagementComp} />
			</Switch>
		</div>
	);
};

export default connect()(MainComp);
