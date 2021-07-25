let User = require('./userSchema.js');

const getAllUsers = () => {
	return new Promise((resolve, reject) => {
		User.find({}, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const getUserById = userId => {
	return new Promise((resolve, reject) => {
		User.findById(userId, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const addUser = newUser => {
	return new Promise((resolve, reject) => {
		let user;
		if (newUser.password != undefined) {
			user = new User({
				username: newUser.username,
				password: newUser.password,
				admin: newUser.admin
			});
		}
		else {
			user = new User({
				username: newUser.username,
				admin: false
			});
		}
		user.save(err => {
			if (err) {
				reject(err);
			}
			else {
				resolve(user);
			}
		});
	});
};

const updateUser = (userId, updatedData) => {
	return new Promise((resolve, reject) => {
		User.findByIdAndUpdate(
			userId,
			{
				username: updatedData.username,
				password: updatedData.password,
				admin: updatedData.admin
			},
			err => {
				if (err) {
					reject(err);
				}
				else {
					resolve('User was updated!');
				}
			}
		);
	});
};

const deleteUser = userId => {
	return new Promise((resolve, reject) => {
		User.findByIdAndDelete(userId, err => {
			if (err) {
				reject(err);
			}
			else {
				resolve('User deleted');
			}
		});
	});
};

module.exports = { getAllUsers, getUserById, addUser, updateUser, deleteUser };
