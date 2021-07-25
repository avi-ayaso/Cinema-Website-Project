import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import UsersManagementComp from './UsersManagementComp';
import { useDispatch, useSelector } from 'react-redux';
import MoviesManagementComp from './MoviesManagementComp';
import SubsManagementComp from './SubsManagementComp';
import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';

const MainComp = props => {
	let dispatch = useDispatch();
	const [ admin, setAdmin ] = useState('none');
	let loggedUser = useSelector(state => state.loggedUser);

	useEffect(async () => {
		try {
			let users = (await axios.get('http://localhost:8080/users')).data;
			let movies = (await axios.get('http://localhost:8080/movies')).data;
			let members = (await axios.get('http://localhost:8080/members')).data;
			let subscriptions = (await axios.get('http://localhost:8080/subscriptions')).data;

			let timeout = sessionStorage.getItem('timeout');
			setTimeout(() => {
				alert('Your Session is over');
				props.history.push('/');
				window.location.reload();
			}, timeout);

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
			if (loggedUser.admin) {
				setAdmin('inline');
			}
		} catch (error) {
			console.error(error);
		}
	}, []);

	const useStyles = makeStyles(() => ({
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
						<Link to="/main/moviesmanagement" className="nav-bar-links">
							Movies
						</Link>
					</Button>
					<Button className={classes.navigationBtn} color="inherit">
						<Link to="/main/subscriptionsmanagement" className="nav-bar-links">
							Subscriptions
						</Link>
					</Button>
					<Button className={classes.navigationBtn} style={{ display: admin }} color="inherit">
						<Link to="/main/usersmanagement" className="nav-bar-links">
							Users Managment
						</Link>
					</Button>
					<Button className={classes.navigationBtn} color="inherit">
						<Link to="/" className="nav-bar-links">
							LogOut
						</Link>
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

export default MainComp;
