import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const EditMovieComp = props => {
	const [ movie, setMovie ] = useState({});
	console.log(movie);
	useEffect(async () => {
		let nextMovie = await axios.get(`http://localhost:8080/movies/${props.match.params._id}`);
		setMovie(nextMovie.data);
	}, []);
	const [ name, setName ] = useState('');
	const [ genresStr, setGenresStr ] = useState('');
	const [ imageUrl, setImage ] = useState('');
	const [ premiered, setPremiered ] = useState('');

	const updateMovie = async () => {
		if (name == '' || genresStr == '' || imageUrl == '' || premiered == '') {
			alert('One or more of the textboxes is empty');
		}
		else {
			let genresArr = genresStr.split(',');
			let updatedMovie = {
				name: name,
				genres: genresArr,
				image: {
					medium: imageUrl
				},
				premiered: premiered
			};

			try {
				let response = axios.put(`http://localhost:8080/movies/${props.match.params.id}`, updatedMovie);
				console.log(response.data);
				props.history.push('/main/moviesmanagement/allmovies/1');
			} catch (error) {
				console.error(error);
			}

			// let update = (await axios.put(`http://localhost:8080/movies/${props.match.params.id}`, updatedMovie)).data;
			// if (update.name !== '') {
			// 	console.log(update);
			// 	props.history.push('/main/moviesmanagement/allmovies/1');
			// }
			// else {
			// 	console.log(update);
			// 	alert('Something went wrong with the Server! );');
			// }
		}
	};

	return (
		<div>
			Name: <input type="text" placeholder={movie.name} onChange={e => setName(e.target.value)} /> <br />
			Genres: <input type="text" placeholder={movie.genres} onChange={e => setGenresStr(e.target.value)} /> <br />
			Image URL: <input type="text" onChange={e => setImage(e.target.value)} /> <br />
			Premiered: <input type="text" placeholder={movie.premiered} onChange={e => setPremiered(e.target.value)} /> <br />
			<br /> <br />
			<input type="button" value="Update" onClick={updateMovie} />
			<Link to={'/main/moviesmanagement'}>
				<input type="button" value="Cancel" />
			</Link>
		</div>
	);
};

export default EditMovieComp;
