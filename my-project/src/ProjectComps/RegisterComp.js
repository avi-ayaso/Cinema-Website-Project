import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterComp = props => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const paperStyle = { padding: 20, height: '70vh', width: 280, margin: '20px auto', borderRadius: '35px' };
	const avatarStyle = { backgroundColor: '#1bbd7e' };
	const btnstyle = { margin: '8px 0' };

	const setupLoginDetails = async () => {
		try {
			let accounts = await (await axios.get('http://localhost:8080/accounts')).data;
			let isInDB = accounts.some(account => account.username === username);
			if (isInDB) {
				accounts.forEach(async account => {
					if (account.username === username) {
						let newAccount = {
							username: username,
							password: password
						};
						await axios.put(`http://localhost:8080/accounts/${account._id}`, newAccount);
						props.history.push('/');
					}
				});
			}
			else {
				alert('No Such Username In the System!');
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align="center">
					<Avatar style={avatarStyle}>
						<LockOutlinedIcon />
					</Avatar>
					<h2>Sign Up</h2>
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
				<Button type="submit" color="primary" variant="contained" style={btnstyle} onClick={setupLoginDetails} fullWidth>
					Register
				</Button>
				<Typography>
					{' '}
					Already have an account?
					<Link to="/"> Sign In!</Link>
				</Typography>
			</Paper>
		</Grid>
	);
};

export default RegisterComp;
