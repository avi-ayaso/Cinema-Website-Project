import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddMemberComp from './AddMemberComp';
import EditMemberComp from './EditMemberComp';
import MembersComp from './MembersComp';
import { connect, useSelector } from 'react-redux';

const SubsManagementComp = () => {
	const [ allowToView, setAllowToView ] = useState('');
	const [ allowToAdd, setAllowToAdd ] = useState('');
	let loggedUser = useSelector(state => state.loggedUser);
	useEffect(() => {
		if (loggedUser.permissions.includes('View Subscriptions')) {
			setAllowToView('inline');
		}
		else {
			setAllowToView('none');
		}
		if (loggedUser.permissions.includes('Create Subscriptions')) {
			setAllowToAdd('inline');
		}
		else {
			setAllowToAdd('none');
		}
	}, []);
	return (
		<div>
			<h3>Subscriptions</h3>
			<Link to="/main/subscriptionsmanagement/allmembers/0">
				<input type="button" style={{ display: allowToView }} value="All Members" />
			</Link>
			<Link to="/main/subscriptionsmanagement/addmember">
				<input type="button" style={{ display: allowToAdd }} value="Add Member" />
			</Link>
			<br /> <br />
			<Switch>
				<Route path="/main/subscriptionsmanagement/allmembers/:reload" component={MembersComp} />
				<Route path="/main/subscriptionsmanagement/addmember" component={AddMemberComp} />
				<Route path="/main/subscriptionsmanagement/editmember/:id" component={EditMemberComp} />
			</Switch>
		</div>
	);
};

export default connect()(SubsManagementComp);
