import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddUserComp from './AddUserComp';
import EditUserComp from './EditUserComp';
import UsersComp from './UsersComp';
import { connect } from 'react-redux';

const UsersManagementComp = () => {
	return (
		<div>
			<h3>Users</h3>
			<Link to="/main/usersmanagement/allusers/0">
				<input type="button" value="All Users" />
			</Link>
			<Link to="/main/usersmanagement/adduser">
				<input type="button" value="Add User" />
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

export default connect()(UsersManagementComp);
