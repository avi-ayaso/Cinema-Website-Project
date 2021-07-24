import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const LoginComp = props => {
	const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto', borderRadius: '35px' };
	const avatarStyle = { backgroundColor: '#1bbd7e' };
	const btnstyle = { margin: '8px 0' };

	let dispatch = useDispatch();
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const checkValues = async () => {
		if (username === 'elad' && password === 'ayaso') {
			let accounts = (await axios.get('http://localhost:8080/accounts')).data;
			let adminDB = accounts.find(account => account.username === 'elad');
			let adminData = (await axios.get(`http://localhost:8080/users/${adminDB._id}`)).data;
			console.log(adminData);
			let action = {
				type: 'ADMIN_ENTERED',
				payload: adminData
			};
			dispatch(action);
			props.history.push('/main');
		}
		else {
			let accounts = (await axios.get('http://localhost:8080/accounts')).data;
			let validateAcoount = accounts.find(account => account.username === username && account.password === password);
			if (validateAcoount === undefined) {
				alert('Incorrect Username/Password');
			}
			else {
				let userData = (await axios.get(`http://localhost:8080/users/${validateAcoount._id}`)).data;
				console.log(userData);
				let action = {
					type: 'USER_ENTERED',
					payload: userData
				};
				dispatch(action);
				props.history.push('/main');
			}
		}
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockOutlinedIcon />
					</Avatar>
					<h2>Sign In</h2>
				</Grid>
				<TextField label="Username" placeholder="Enter username" onChange={e => setUsername(e.target.value)} fullWidth required />
				<TextField
					label="Password"
					placeholder="Enter password"
					type="password"
					onChange={e => setPassword(e.target.value)}
					fullWidth
					required
				/>
				<br /> <br /> <br />
				<Button type="submit" color="primary" variant="contained" style={btnstyle} onClick={checkValues} fullWidth>
					Login
				</Button>
				<Typography>
					{' '}
					Don't have an account?
					<Link to="/register"> Sign Up!</Link>
				</Typography>
			</Paper>
		</Grid>
	);
};
export default LoginComp;
