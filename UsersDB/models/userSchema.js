const mongoose = require('mongoose');

const schema = mongoose.Schema;
let userSchema = new schema({
	username: String,
	password: String,
	admin: Boolean
});

module.exports = mongoose.model('user', userSchema);
