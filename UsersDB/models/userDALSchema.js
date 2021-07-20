const mongoose = require('mongoose');

const schema = mongoose.Schema;
let userSchema = new schema({
	username: String
});

module.exports = mongoose.model('users', userSchema);
