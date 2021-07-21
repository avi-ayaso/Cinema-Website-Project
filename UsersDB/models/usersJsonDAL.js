const jsonfile = require('jsonfile');
const usersPath =
	'C:\\Users\\elada\\OneDrive\\שולחן העבודה\\Full Stack Web Course\\Fullstack Final Project\\Cinema-Website-Project\\UsersDB\\Users.json';

const getAllJsonUsers = () => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(usersPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const getJsonUserById = userId => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(usersPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let user = data.find(user => user.id === userId);
				resolve(user);
			}
		});
	});
};

const addJsonUser = newUser => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(usersPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let usersArr = data;
				usersArr.push(newUser);
				jsonfile.writeFile(usersPath, usersArr, (err, data) => {
					if (err) {
						reject(err);
					}
					else {
						resolve('User Created!');
					}
				});
			}
		});
	});
};

const updateJsonUser = updatedData => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(usersPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let usersArr = data;
				let index = usersArr.findIndex(user => user.id == updatedData.id);
				console.log(index);
				let creation = usersArr[index].creationDate;
				usersArr[index] = updatedData;
				usersArr[index].creationDate = creation;
				jsonfile.writeFile(usersPath, usersArr, err => {
					if (err) {
						reject(err);
					}
					else {
						resolve('User Updated!');
					}
				});
			}
		});
	});
};

const deleteJsonUser = userId => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(usersPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let usersArr = data;
				let index = usersArr.findIndex(user => user.id === userId);
				if (index > 0) {
					usersArr.splice(index, 1);
					jsonfile.writeFile(usersPath, usersArr, err => {
						if (err) {
							reject(err);
						}
						else {
							resolve('User Deleted!');
						}
					});
				}
				else {
					resolve('No user with this ID is in the User.json file');
				}
			}
		});
	});
};

module.exports = { getAllJsonUsers, getJsonUserById, addJsonUser, updateJsonUser, deleteJsonUser };
