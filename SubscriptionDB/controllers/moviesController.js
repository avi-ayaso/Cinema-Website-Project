const express = require('express');
const router = express.Router();
const movieBL = require('../models/movieBL');

router.route('/').get(async (req, resp) => {
	let movies = await movieBL.getAllMovies();
	return resp.json(movies);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let movie = await movieBL.getMovieById(id);
	return resp.json(movie);
});

router.route('/').post(async (req, resp) => {
	let newMovie = req.body;
	let movie = await movieBL.addMovie(newMovie);
	return resp.json(movie);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedMovie = req.body;
	let result = await movieBL.updateMovie(id, updatedMovie);
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	let result = await movieBL.deleteMovie(id);
	return resp.json(result);
});

module.exports = router;
