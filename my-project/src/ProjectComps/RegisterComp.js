import axios from 'axios';
import React, { useState } from 'react';

const RegisterComp = props => {
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const setupLoginDetails = async () => {
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
	};

	return (
		<div>
			<h3>Create Account Page</h3>
			Username: <input type="text" onChange={e => setUsername(e.target.value)} /> <br />
			Password: <input type="text" onChange={e => setPassword(e.target.value)} /> <br />
			<input type="button" value="Register" onClick={setupLoginDetails} />
		</div>
	);
};

export default RegisterComp;
