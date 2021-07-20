const mongoose = require('mongoose');

const schema = mongoose.Schema;
let memberSchema = new schema({
	name: String,
	email: String,
	address: {
		city: String
	}
});

module.exports = mongoose.model('members', memberSchema);
