import React, { useEffect, useState } from 'react';
import MovieRepeaterComp from './MovieRepeaterComp';
import { connect, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const MoviesComp = props => {
	let moviesData = useSelector(state => state.movies);
	const [ movies, setMovies ] = useState([]);

	useEffect(() => {
		setMovies(moviesData);
	}, []);

	useEffect(
		() => {
			if (props.match.params.reload == 1) {
				props.history.push('/main/moviesmanagement/allmovies/0');
				window.location.reload();
			}
		},
		[ props.match.params.reload ]
	);

	const [ searchQuery, setSearchQuery ] = useState('');
	const searchBar = () => {
		let filteredArr = movies.filter(movie => movie.name.includes(searchQuery));
		setMovies(filteredArr);
	};

	const [ pageNum, setPageNum ] = useState(0);
	const moviesPerPage = 10;
	const pagesVisited = pageNum * moviesPerPage;

	const displayMovies = movies.slice(pagesVisited, pagesVisited + moviesPerPage).map((movie, index) => {
		return (
			<div key={index} className="movie">
				<MovieRepeaterComp movie={movie} />
				<br />
			</div>
		);
	});

	const pageCount = Math.ceil(movies.length / moviesPerPage);

	const changePage = ({ selected }) => {
		setPageNum(selected);
	};
	// let moviesObj = movies.map((movie, index) => {
	// 	return (
	// 		<tr key={index}>
	// 			<td>
	// 				<MovieRepeaterComp movie={movie} />
	// 				<br />
	// 			</td>
	// 		</tr>
	// 	);
	// });

	return (
		<div>
			Find Movie: <input type="text" onChange={e => setSearchQuery(e.target.value)} />
			<input type="button" value="Find" onClick={searchBar} /> <br />
			{displayMovies}
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
	);
};

const mapStateToProps = state => {
	return {
		data: state
	};
};

export default connect(mapStateToProps)(MoviesComp);
