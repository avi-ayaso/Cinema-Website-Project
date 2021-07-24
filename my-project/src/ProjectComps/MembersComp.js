import React, { useEffect, useState } from 'react';
import MemberRepeaterComp from './MemberRepeaterComp';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const MembersComp = props => {
	let subsData = useSelector(state => state.subscriptions);
	console.log(subsData);
	let membersData = useSelector(state => state.members);
	const [ members, setMembers ] = useState([]);
	useEffect(() => {
		setMembers(membersData);
	}, []);

	useEffect(
		() => {
			if (props.match.params.reload == 1) {
				props.history.push('/main/membersmanagement/allmemebers/0');
				window.location.reload();
			}
		},
		[ props.match.params.reload ]
	);

	// let membersObj = members.map((member, index) => {
	// 	return (
	// 		<tr key={index}>
	// 			<td>
	// 				<MemberRepeaterComp member={member} />
	// 				<br />
	// 			</td>
	// 		</tr>
	// 	);
	// });

	const [ pageNum, setPageNum ] = useState(0);
	const membersPerPage = 10;
	const pagesVisited = pageNum * membersPerPage;

	const displayMembers = members.slice(pagesVisited, pagesVisited + membersPerPage).map((member, index) => {
		return (
			<div key={index} className="member">
				<MemberRepeaterComp member={member} />
				<br />
			</div>
		);
	});

	const pageCount = Math.ceil(members.length / membersPerPage);

	const changePage = ({ selected }) => {
		setPageNum(selected);
	};

	return (
		<div>
			<div className="members-container">{displayMembers}</div>
			<div className="pagination-container">
				<ReactPaginate
					previousLabel={'<'}
					nextLabel={'>'}
					pageCount={pageCount}
					onPageChange={changePage}
					containerClassName={'paginationBttns'}
					previousLinkClassName={'previousBttn'}
					nextLinkClassName={'nextBttn'}
					disabledClassName={'paginationDisabled'}
					activeClassName={'paginationActive'}
				/>
			</div>
			{/* <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<tbody>{membersObj}</tbody>
			</table> */}
		</div>
	);
};

export default MembersComp;
