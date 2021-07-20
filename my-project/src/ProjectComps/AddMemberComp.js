import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AddMemberComp = props => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ city, setCity ] = useState('');

	const AddMember = async () => {
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
			<h2>Add Member</h2>
			Name: <input type="text" onChange={e => setName(e.target.value)} /> <br />
			Email: <input type="email" onChange={e => setEmail(e.target.value)} /> <br />
			City: <input type="text" onChange={e => setCity(e.target.value)} /> <br />
			<br /> <br />
			<input type="button" value="Add" onClick={AddMember} />
			<Link to={'/main/membersmanagement'}>
				<input type="button" value="Cancel" />
			</Link>
		</div>
	);
};

export default AddMemberComp;
