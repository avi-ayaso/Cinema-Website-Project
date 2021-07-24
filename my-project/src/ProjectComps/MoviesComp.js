import React, { useEffect, useState } from 'react';
import MovieRepeaterComp from './MovieRepeaterComp';
import { connect, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Button, TextField } from '@material-ui/core';

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
		if (searchQuery == '') {
			setMovies(moviesData);
		}
		else {
			let filteredArr = moviesData.filter(movie => movie.name.includes(searchQuery));
			setMovies(filteredArr);
		}
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

	const btnstyle = { color: 'black', backgroundColor: 'white', margin: '8px 0', marginDown: '5px', borderRadius: '15px' };

	return (
		<div>
			<TextField label="Enter Movie Name" onChange={e => setSearchQuery(e.target.value)} style={{ marginRight: '10px' }} />
			<Button color="primary" variant="contained" onClick={searchBar} style={btnstyle}>
				Search
			</Button>
			<div className="movies-container">{displayMovies}</div>
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

export default connect()(MoviesComp);
