import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EditMemberComp = props => {
	const [ member, setMember ] = useState({});
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ city, setCity ] = useState('');
	useEffect(
		async () => {
			let nextMember = await axios.get(`http://localhost:8080/members/${props.match.params.id}`);
			setMember(nextMember.data);
		},
		[ props.match.params.id ]
	);

	const updateMember = async () => {
		if (name == '' || email == '' || city == '') {
			alert('One or more of the textboxes is empty');
		}
		else {
			let updatedMember = {
				name: name,
				email: email,
				address: {
					city: city
				}
			};

			try {
				let response = axios.put(`http://localhost:8080/members/${props.match.params.id}`, updatedMember);
				console.log(response.data);
				props.history.push('/main/subscriptionsmanagement/allmembers/1');
			} catch (error) {
				console.error(error);
			}

			// let update = (await axios.put(`http://localhost:8080/members/${props.match.params.id}`, updatedMember)).data;
			// if (update.name !== '') {
			// 	console.log(update);
			// 	props.history.push('/main/subscriptionsmanagement/allmembers/1');
			// }
			// else {
			// 	console.log(update);
			// 	alert('Something went wrong with the Server! );');
			// }
		}
	};

	return (
		<div>
			<h2>Edit Member - {member.name}</h2>
			Name: <input type="text" onChange={e => setName(e.target.value)} /> <br />
			Email: <input type="email" onChange={e => setEmail(e.target.value)} /> <br />
			City: <input type="text" onChange={e => setCity(e.target.value)} /> <br />
			<br /> <br />
			<input type="button" value="Update" onClick={updateMember} />
			<Link to={'/main/membersmanagement'}>
				<input type="button" value="Cancel" />
			</Link>
		</div>
	);
};

export default EditMemberComp;
