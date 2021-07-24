const jsonfile = require('jsonfile');
const permissionsPath =
	'.\\Permissions.json';

const getAllUsersPermissions = () => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(permissionsPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const getUserPermissionById = permissionId => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(permissionsPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let permission = data.find(permission => permission.id === permissionId);
				resolve(permission);
			}
		});
	});
};

const addUserToPermission = newUserToPermission => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(permissionsPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let permissionsArr = data;
				permissionsArr.push(newUserToPermission);
				jsonfile.writeFile(permissionsPath, permissionsArr, err => {
					if (err) {
						reject(err);
					}
					else {
						resolve('Permissions Created!');
					}
				});
			}
		});
	});
};

const updateUserPermission = updatedData => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(permissionsPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let permissionsArr = data;
				let index = permissionsArr.findIndex(permission => permission.id === updatedData.id);
				permissionsArr[index] = updatedData;
				jsonfile.writeFile(permissionsPath, permissionsArr, err => {
					if (err) {
						reject(err);
					}
					else {
						resolve("User's Permission Updated!");
					}
				});
			}
		});
	});
};

const deleteUserPermission = permissionId => {
	return new Promise((resolve, reject) => {
		jsonfile.readFile(permissionsPath, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				let permissionsArr = data;
				let index = permissionsArr.findIndex(permission => permission.id === permissionId);
				if (index > 0) {
					permissionsArr.splice(index, 1);
					jsonfile.writeFile(permissionsPath, permissionsArr, err => {
						if (err) {
							reject(err);
						}
						else {
							resolve("User's Permission Deleted!");
						}
					});
				}
				else {
					resolve('No user with this ID is in the Permissions.json file');
				}
			}
		});
	});
};

module.exports = { getAllUsersPermissions, getUserPermissionById, addUserToPermission, updateUserPermission, deleteUserPermission };
