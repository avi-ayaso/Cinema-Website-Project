const { addUser } = require('../models/usersDBDAL');
const admin1 = {
	username: 'elad',
	password: 'ayaso',
	admin: true
};
addUser(admin1);
const admin2 = {
	username: 'aviv',
	password: 'zamir',
	admin: true
};
addUser(admin2);
const user = {
	username: 'avi',
	password: 'ayaso',
	admin: false
};
addUser(user);
