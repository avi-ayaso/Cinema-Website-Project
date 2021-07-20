const { default: axios } = require('axios');
const { addMember } = require('../models/memberBL');
const { addMovie } = require('../models/movieBL');

axios.get('http://api.tvmaze.com/shows').then(movies => {
	movies.data.map(movie => {
		addMovie(movie);
	});
});

axios.get('https://jsonplaceholder.typicode.com/users').then(members => {
	members.data.map(member => {
		addMember(member);
	});
});
