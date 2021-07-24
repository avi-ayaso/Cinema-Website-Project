import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddUserComp from './AddUserComp';
import EditUserComp from './EditUserComp';
import UsersComp from './UsersComp';
import { connect } from 'react-redux';

const UsersManagementComp = () => {
	const linkStyle = {
		backgroundColor: 'white',
		color: 'black',
		padding: '5px 5px',
		textAlign: 'center',
		textDecoration: 'none',
		display: 'inline-block',
		marginLeft: '10px',
		marginRight: '10px'
	};

	return (
		<div style={{ marginTop: '20px' }}>
			<Link to="/main/usersmanagement/allusers/0" style={linkStyle}>
				All Users
			</Link>
			<Link to="/main/usersmanagement/adduser" style={linkStyle}>
				Add User
			</Link>
			<br /> <br />
			<Switch>
				<Route path="/main/usersmanagement/allusers/:reload" component={UsersComp} />
				<Route path="/main/usersmanagement/adduser" component={AddUserComp} />
				<Route path="/main/usersmanagement/edituser/:id" component={EditUserComp} />
			</Switch>
		</div>
	);
};

export default UsersManagementComp;
