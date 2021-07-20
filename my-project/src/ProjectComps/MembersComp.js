import React, { useEffect } from 'react';
import MemberRepeaterComp from './MemberRepeaterComp';
import { connect, useSelector } from 'react-redux';

const MembersComp = props => {
	useEffect(
		() => {
			if (props.match.params.reload == 1) {
				props.history.push('/main/membersmanagement/allmemebers/0');
				window.location.reload();
			}
		},
		[ props.match.params.reload ]
	);
	let membersData = useSelector(state => state.members);
	let membersObj = membersData.map((member, index) => {
		return (
			<tr key={index}>
				<td>
					<MemberRepeaterComp member={member} />
					<br />
				</td>
			</tr>
		);
	});
	return (
		<div>
			<table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<tbody>{membersObj}</tbody>
			</table>
		</div>
	);
};

export default connect()(MembersComp);
