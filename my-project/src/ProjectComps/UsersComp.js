import React, { useEffect } from 'react';
import UserRepeaterComp from './UserRepeaterComp';
import { connect, useSelector } from 'react-redux';

const UsersComp = props => {
	useEffect(
		() => {
			if (props.match.params.reload == 1) {
				props.history.push('/main/usersmanagement/allusers/0');
				window.location.reload();
			}
		},
		[ props.match.params.reload ]
	);
	let usersData = useSelector(state => state.users);
	let usersObj = usersData.map((user, index) => {
		return (
			<tr key={index}>
				<td>
					<UserRepeaterComp user={user} />
					<br />
				</td>
			</tr>
		);
	});
	return (
		<div>
			<table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<tbody>{usersObj}</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		data: state
	};
};

export default connect(mapStateToProps)(UsersComp);
