const mongoose = require('mongoose');

const schema = mongoose.Schema;
let movieSchema = new schema({
	name: String,
	genres: [],
	image: {
		medium: String
	},
	premiered: Date
});

module.exports = mongoose.model('movies', movieSchema);
