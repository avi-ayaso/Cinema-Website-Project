import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddUserComp = props => {
	const [ fname, setFirstName ] = useState('');
	const [ lname, setLastName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ sessionTimeOut, setSessionTimeOut ] = useState('');
	const [ viewSubs, setViewSubs ] = useState(false);
	const [ createSubs, setCreateSubs ] = useState(false);
	const [ updateSubs, setUpdateSubs ] = useState(false);
	const [ deleteSubs, setDeleteSubs ] = useState(false);
	const [ viewMovies, setViewMovies ] = useState(false);
	const [ createMovies, setCreateMovies ] = useState(false);
	const [ updateMovies, setUpdateMovies ] = useState(false);
	const [ deleteMovies, setDeleteMovies ] = useState(false);

	const createSubFunc = e => {
		setCreateSubs(e.target.checked);
		setViewSubs(e.target.checked);
	};
	const updateSubFunc = e => {
		setUpdateSubs(e.target.checked);
		setViewSubs(e.target.checked);
	};
	const deleteSubFunc = e => {
		setDeleteSubs(e.target.checked);
		setViewSubs(e.target.checked);
	};
	const createMovieFunc = e => {
		setCreateMovies(e.target.checked);
		setViewMovies(e.target.checked);
	};
	const updateMovieFunc = e => {
		setUpdateMovies(e.target.checked);
		setViewMovies(e.target.checked);
	};
	const deleteMovieFunc = e => {
		setDeleteMovies(e.target.checked);
		setViewMovies(e.target.checked);
	};

	const addUser = async () => {
		if (fname == '' || lname == '' || username == '' || sessionTimeOut == '') {
			alert('One or more of the textboxes is empty');
		}
		else {
			let permissions = [];
			if (viewSubs) {
				permissions.push('View Subscriptions');
			}
			if (createSubs) {
				permissions.push('Create Subscriptions');
			}
			if (updateSubs) {
				permissions.push('Update Subscriptions');
			}
			if (deleteSubs) {
				permissions.push('Delete Subscriptions');
			}
			if (viewMovies) {
				permissions.push('View Movies');
			}
			if (createMovies) {
				permissions.push('Create Movies');
			}
			if (updateMovies) {
				permissions.push('Update Movies');
			}
			if (deleteMovies) {
				permissions.push('Delete Movies');
			}
			let creation = new Date();
			let newUser = {
				firstName: fname,
				lastName: lname,
				username: username,
				creationDate: creation,
				sessionTimeOut: sessionTimeOut,
				permissions: permissions
			};
			let addedUser = (await axios.post('http://localhost:8080/users', newUser)).data;
			if (addedUser.username !== '') {
				console.log(addedUser);
				props.history.push('/main/usersmanagement/allusers/1');
			}
			else {
				console.log(addedUser);
				alert('Something went wrong with the Server );');
			}
		}
	};
	return (
		<div>
			First Name: <input type="text" onChange={e => setFirstName(e.target.value)} /> <br />
			Last Name: <input type="text" onChange={e => setLastName(e.target.value)} /> <br />
			Username: <input type="text" onChange={e => setUsername(e.target.value)} /> <br />
			Session time out: <input type="text" onChange={e => setSessionTimeOut(e.target.value)} /> <br />
			Permissions: <br />
			<input type="checkbox" onChange={e => setViewSubs.bind(this, e.target.checked)} /> View Subscriptions <br />
			<input type="checkbox" onChange={e => createSubFunc.bind(this, e.target.checked)} /> Create Subscriptions <br />
			<input type="checkbox" onChange={e => updateSubFunc.bind(this, e.target.checked)} /> Update Subscriptions <br />
			<input type="checkbox" onChange={e => deleteSubFunc.bind(this, e.target.checked)} /> Delete Subscriptions <br />
			<input type="checkbox" onChange={e => setViewMovies.bind(this, e.target.checked)} /> View Movies <br />
			<input type="checkbox" onChange={e => createMovieFunc.bind(this, e.target.checked)} /> Create Movies <br />
			<input type="checkbox" onChange={e => updateMovieFunc.bind(this, e.target.checked)} /> Update Movies <br />
			<input type="checkbox" onChange={e => deleteMovieFunc.bind(this, e.target.checked)} /> Delete Movies
			<br /> <br />
			<input type="button" value="Add" onClick={addUser} />
			<Link to={'/main/usersmanagement'}>
				<input type="button" value="Cancel" />
			</Link>
		</div>
	);
};

export default AddUserComp;
