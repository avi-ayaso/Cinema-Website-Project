import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const UserRepeaterComp = props => {
	let headlineVisibility = 'none';
	let btnsVisibility = 'inline';
	if (props.user.username == 'elad') {
		btnsVisibility = 'none';
		headlineVisibility = 'block';
	}

	const deleteUser = async () => {
		await axios.delete(`http://localhost:8080/users/${props.user.id}`);
		window.location.reload();
	};

	const btnStyle = {
		backgroundColor: 'transparent',
		color: 'black',
		padding: '5px 5px',
		textAlign: 'center',
		textDecoration: 'none',
		display: 'inline-block',
		marginLeft: '10px',
		marginRight: '10px'
	};

	return (
		<div style={{ padding: '10px' }}>
			<h3 style={{ display: headlineVisibility }}>Admin</h3>
			<b>Name:</b> {props.user.firstName + ' ' + props.user.lastName} <br />
			<b>Username:</b> {props.user.username} <br />
			<b>Session time out:</b> {props.user.sessionTimeOut} <br />
			<b>Created data:</b> {props.user.creationDate} <br />
			<b>Permissions:</b> {props.user.permissions.toString()}
			<br /> <br />
			<Button style={{ display: btnsVisibility }}>
				{' '}
				<Link to={`/main/usersmanagement/edituser/${props.user.id}`} className="repeater-btns">
					Edit
				</Link>
			</Button>
			<Button className="repeater-btns" style={{ display: btnsVisibility }} onClick={deleteUser}>
				Delete
			</Button>
			{/* <Link to={`/main/usersmanagement/edituser/${props.user.id}`}>
				<input type="button" style={{ display: btnsVisibility }} value="Edit" />
			</Link>
			<input type="button" style={{ display: btnsVisibility }} value="Delete" onClick={deleteUser} /> */}
		</div>
	);
};

export default withRouter(connect()(UserRepeaterComp));
