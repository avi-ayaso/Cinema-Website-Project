import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

const LoginComp = props => {
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
		<div>
			<h3>Log In Page</h3>
			Username: <input type="text" onChange={e => setUsername(e.target.value)} /> <br />
			Password: <input type="password" onChange={e => setPassword(e.target.value)} /> <br />
			<input type="button" value="Login" onClick={checkValues} /> <br />
			New User? <br />
			<Link to="/register">Create Account</Link>
		</div>
	);
};

export default connect()(LoginComp);
