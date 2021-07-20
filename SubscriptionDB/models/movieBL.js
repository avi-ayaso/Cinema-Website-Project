let Movie = require('./movieSchema');
const fetch = require('node-fetch');

const getAllMovies = () => {
	return new Promise((resolve, reject) => {
		Movie.find({}, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const getMovieById = movieId => {
	return new Promise((resolve, reject) => {
		Movie.findById(movieId, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const addMovie = newMovie => {
	return new Promise((resolve, reject) => {
		let movie = new Movie({
			name: newMovie.name,
			genres: newMovie.genres,
			image: {
				medium: newMovie.image.medium
			},
			premiered: newMovie.premiered
		});
		movie.save(err => {
			if (err) {
				reject(err);
			}
			else {
				resolve(movie);
			}
		});
	});
};

const updateMovie = (movieId, updatedData) => {
	return new Promise((resolve, reject) => {
		Movie.findByIdAndUpdate(
			movieId,
			{
				name: updatedData.name,
				genres: updatedData.genres,
				image: updatedData.image.medium,
				premiered: updatedData.premiered
			},
			err => {
				if (err) {
					reject(err);
				}
				else {
					resolve('Movie was updated!');
				}
			}
		);
	});
};

const deleteMovie = movieId => {
	return new Promise((resolve, reject) => {
		Movie.findByIdAndDelete(movieId, err => {
			if (err) {
				reject(err);
			}
			else {
				resolve('Movie deleted!!!');
			}
		});
	});
};

module.exports = { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
