import { Button, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
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
			<TextField label="Enter Movie Name" onChange={e => setName(e.target.value)} /> <br />
			<TextField label="Enter Genres" onChange={e => setGenresStr(e.target.value)} /> <br />
			<TextField label="Enter Image URL" onChange={e => setImage(e.target.value)} /> <br />
			<TextField label="Enter Year Premiered" onChange={e => setPremiered(e.target.value)} /> <br />
			<br /> <br />
			<Button onClick={addMovie}>Add</Button>
			<Button>
				<Link to={`/main/moviesmanagement`} className="repeater-btns">
					Cancel
				</Link>
			</Button>
		</div>
	);
};

export default AddMovieComp;
