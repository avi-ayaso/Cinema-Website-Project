import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const AddMovieComp = props => {
	const [ name, setName ] = useState('');
	const [ genresStr, setGenresStr ] = useState('');
	const [ imageUrl, setImage ] = useState('');
	const [ premiered, setPremiered ] = useState('');

	const addMovie = async () => {
		if (name == '' || genresStr == '' || imageUrl == '' || premiered == '') {
			alert('One or more of the textboxes is empty');
		}
		else {
			let genresArr = genresStr.split(',');
			let newMovie = {
				name: name,
				genres: genresArr,
				image: {
					medium: imageUrl
				},
				premiered: premiered
			};
			let addedMovie = (await axios.post('http://localhost:8080/movies', newMovie)).data;
			if (addedMovie.name !== '') {
				console.log(addedMovie);
				props.history.push('/main/moviesmanagement/allmovies/1');
			}
			else {
				console.log(addedMovie);
				alert('Something went wrong with the Server! );');
			}
		}
	};
	return (
		<div>
			Name: <input type="text" onChange={e => setName(e.target.value)} /> <br />
			Genres: <input type="text" onChange={e => setGenresStr(e.target.value)} /> <br />
			Image URL: <input type="text" onChange={e => setImage(e.target.value)} /> <br />
			Premiered: <input type="text" onChange={e => setPremiered(e.target.value)} /> <br />
			<input type="button" value="Add" onClick={addMovie} />
			<Link to={'/main/moviesmanagement'}>
				<input type="button" value="Cancel" />
			</Link>
		</div>
	);
};

export default connect()(AddMovieComp);
