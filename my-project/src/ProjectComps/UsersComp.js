import React, { useEffect, useState } from 'react';
import UserRepeaterComp from './UserRepeaterComp';
import { connect, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const UsersComp = props => {
	let usersData = useSelector(state => state.users);
	const [ users, setUsers ] = useState([]);

	useEffect(() => {
		setUsers(usersData);
	}, []);

	useEffect(() => {
		if (props.match.params.reload == 1) {
			props.history.push('/main/usersmanagement/allusers/0');
			window.location.reload();
		}
	}, []);

	const [ pageNum, setPageNum ] = useState(0);
	const usersPerPage = 10;
	const pagesVisited = pageNum * usersPerPage;

	const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map((user, index) => {
		return (
			<div key={index} className="user">
				<UserRepeaterComp user={user} />
				<br />
			</div>
		);
	});

	const pageCount = Math.ceil(users.length / usersPerPage);

	const changePage = ({ selected }) => {
		setPageNum(selected);
	};

	return (
		<div>
			<div className="users-container">{displayUsers}</div>
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
		</div>
	);
};

export default connect()(UsersComp);
