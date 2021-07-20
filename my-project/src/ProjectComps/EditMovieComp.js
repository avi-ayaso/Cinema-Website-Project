import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const EditMovieComp = props => {
	const [ movie, setMovie ] = useState({});
	useEffect(async () => {
		setMovie(props.data.movies.find(movie => movie._id == props.match.params.id));
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
			let update = (await axios.put(`http://localhost:8080/movies/${props.match.params.id}`, updatedMovie)).data;
			if (update.name !== '') {
				console.log(update);
				props.history.push('/main/moviesmanagement/allmovies/1');
			}
			else {
				console.log(update);
				alert('Something went wrong with the Server! );');
			}
		}
	};
	console.log(props);
	return (
		<div>
			Name: <input type="text" onChange={e => setName(e.target.value)} /> <br />
			Genres: <input type="text" onChange={e => setGenresStr(e.target.value)} /> <br />
			Image URL: <input type="text" onChange={e => setImage(e.target.value)} /> <br />
			Premiered: <input type="text" onChange={e => setPremiered(e.target.value)} /> <br />
			<br /> <br />
			<input type="button" value="Update" onClick={updateMovie} />
			<Link to={'/main/moviesmanagement'}>
				<input type="button" value="Cancel" />
			</Link>
		</div>
	);
};

const mapStateToProps = state => {
	return {
		data: state
	};
};

export default connect(mapStateToProps)(EditMovieComp);
