import React, { useEffect, useState } from 'react';
import MovieRepeaterComp from './MovieRepeaterComp';
import { connect, useSelector } from 'react-redux';

const MoviesComp = props => {
	useEffect(
		() => {
			if (props.match.params.reload == 1) {
				props.history.push('/main/moviesmanagement/allmovies/0');
				window.location.reload();
			}
		},
		[ props.match.params.reload ]
	);
	let moviesData = useSelector(state => state.movies);
	const [ searchQuery, setSearchQuery ] = useState('');
	const [ searchBar, setSearchBar ] = useState('');
	let filteredArr = moviesData.filter(movie => movie.name.includes(searchBar));
	let moviesObj = filteredArr.map((movie, index) => {
		return (
			<tr key={index}>
				<td>
					<MovieRepeaterComp movie={movie} />
					<br />
				</td>
			</tr>
		);
	});
	return (
		<div>
			Find Movie: <input type="text" onChange={e => setSearchQuery(e.target.value)} />
			<input type="button" value="Find" onClick={setSearchBar.bind(this, searchQuery)} />
			<table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
				<tbody>{moviesObj}</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		data: state
	};
};

export default connect(mapStateToProps)(MoviesComp);
