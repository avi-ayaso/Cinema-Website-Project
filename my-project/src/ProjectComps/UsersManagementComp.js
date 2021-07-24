import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddUserComp from './AddUserComp';
import EditUserComp from './EditUserComp';
import UsersComp from './UsersComp';

const UsersManagementComp = () => {
	return (
		<div style={{ marginTop: '20px' }}>
			<Link to="/main/usersmanagement/allusers/0" className="managment-btns">
				All Users
			</Link>
			<Link to="/main/usersmanagement/adduser" className="managment-btns">
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
