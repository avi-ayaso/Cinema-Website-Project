import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const UserRepeaterComp = props => {
	let isVisible = 'inline';
	if (props.user.username == 'elad') {
		isVisible = 'none';
	}
	const deleteUser = async () => {
		await axios.delete(`http://localhost:8080/users/${props.user.id}`);
		window.location.reload();
	};
	return (
		<div>
			Name: {props.user.firstName + ' ' + props.user.lastName} <br />
			Username: {props.user.username} <br />
			Session time out: {props.user.sessionTimeOut} <br />
			Created data: {props.user.creationDate} <br />
			Permissions: {props.user.permissions.toString()}
			<br /> <br />
			<Link to={`/main/usersmanagement/edituser/${props.user.id}`}>
				<input type="button" style={{ display: isVisible }} value="Edit" />
			</Link>
			<input type="button" style={{ display: isVisible }} value="Delete" onClick={deleteUser} />
		</div>
	);
};

export default withRouter(connect()(UserRepeaterComp));
