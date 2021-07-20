const mongoose = require('mongoose');

const schema = mongoose.Schema;
let subscriptionSchema = new schema({
	memberId: String,
	movies: [
		{
			movieId: String,
			date: Date
		}
	]
});

module.exports = mongoose.model('subscription', subscriptionSchema);
