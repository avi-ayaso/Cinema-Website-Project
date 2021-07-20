const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.route('/').get(async (req, resp) => {
	let movies = await (await axios.get('http://localhost:8090/movies')).data;
	return resp.json(movies);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let movie = await (await axios.get(`http://localhost:8090/movies/${id}`)).data;
	return resp.json(movie);
});

router.route('/').post(async (req, resp) => {
	let newMovie = req.body;
	let result = await (await axios.post('http://localhost:8090/movies', newMovie)).data;
	return resp.json(result);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedMovie = req.body;
	let result = await (await axios.put(`http://localhost:8090/movies/${id}`, updatedMovie)).data;
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	let result = await (await axios.delete(`http://localhost:8090/movies/${id}`)).data;
	return resp.json(result);
});

module.exports = router;
