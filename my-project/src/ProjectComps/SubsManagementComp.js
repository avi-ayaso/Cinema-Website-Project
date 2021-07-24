import React, { useEffect, useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import AddMemberComp from './AddMemberComp';
import EditMemberComp from './EditMemberComp';
import MembersComp from './MembersComp';
import { useSelector } from 'react-redux';

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
		<div style={{ marginTop: '20px' }}>
			<Link to="/main/subscriptionsmanagement/allmembers/0" className="managment-btns" style={{ display: allowToView }}>
				All Members
			</Link>
			<Link to="/main/subscriptionsmanagement/addmember" className="managment-btns" style={{ display: allowToAdd }}>
				Add Member
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

export default SubsManagementComp;
