import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddMemberComp = props => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ city, setCity ] = useState('');

	const addMember = async () => {
		if (name == '' || email == '' || city == '') {
			alert('One or more of the textboxes is empty');
		}
		else {
			let newMember = {
				name: name,
				email: email,
				address: {
					city: city
				}
			};
			let addedMember = (await axios.post('http://localhost:8080/members/', newMember)).data;
			if (addedMember.name !== '') {
				console.log(addedMember);
				props.history.push('/main/subscriptionsmanagement/allmembers/1');
			}
			else {
				console.log(addedMember);
				alert('Something went wrong with the Server! );');
			}
		}
	};

	return (
		<div>
			<TextField label="Enter Member Name" onChange={e => setName(e.target.value)} /> <br />
			<TextField label="Enter Email" onChange={e => setEmail(e.target.value)} /> <br />
			<TextField label="Enter City" onChange={e => setCity(e.target.value)} /> <br />
			<br /> <br />
			<Button onClick={addMember}> Add</Button>
			<Button>
				<Link to={`/main/membersmanagement`} className="repeater-btns">
					Cancel
				</Link>
			</Button>
		</div>
	);
};

export default AddMemberComp;
