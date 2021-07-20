let permissionBL = require('./permissionsDAL');
let userBL = require('./usersDBDAL');
let usersBL = require('./usersJsonDAL');

const getAllUsersData = async () => {
	let usersJsonArr = await usersBL.getAllJsonUsers();
	let usersPermissionsArr = await permissionBL.getAllUsersPermissions();
	let usersDBArr = await userBL.getAllUsers();
	let data = [];
	for (let i = 0; i < usersJsonArr.length; i++) {
		data[i] = {
			id: usersDBArr[i]._id,
			username: usersDBArr[i].username,
			firstName: usersJsonArr[i].firstName,
			lastName: usersJsonArr[i].lastName,
			creationDate: usersJsonArr[i].creationDate,
			sessionTimeOut: usersJsonArr[i].sessionTimeOut,
			permissions: usersPermissionsArr[i].permissions
		};
	}
	return data;
};

const getUserDataById = async userId => {
	let users = await getAllUsersData();
	let user = users.find(user => user.id == userId);
	return user;
};

const addUser = async newUser => {
	let addToDb = {
		username: newUser.username
	};
	let user = await userBL.addUser(addToDb);
	let addToUsersJson = {
		id: user._id,
		firstName: newUser.firstName,
		lastName: newUser.lastName,
		creationDate: newUser.creationDate,
		sessionTimeOut: newUser.sessionTimeOut
	};
	await usersBL.addJsonUser(addToUsersJson);
	let addToPermissionsJson = {
		id: user._id,
		permissions: newUser.permissions
	};
	await permissionBL.addUserToPermission(addToPermissionsJson);
	let userObj = {
		id: user._id,
		username: addToDb.username,
		firstName: addToUsersJson.firstName,
		lastName: addToUsersJson.lastName,
		creationDate: addToUsersJson.creationDate,
		sessionTimeOut: addToUsersJson.sessionTimeOut,
		permissions: addToPermissionsJson.permissions
	};
	return userObj;
};

const updateUser = async (userId, updatedUser) => {
	let updateDb = {
		username: updatedUser.username,
		password: updatedUser.password
	};
	await userBL.updateUser(userId, updateDb);
	let userCreationDate = (await usersBL.getJsonUserById(userId)).creationDate;
	let updateUsersJson = {
		id: userId,
		firstName: updatedUser.firstName,
		lastName: updatedUser.lastName,
		creationDate: userCreationDate,
		sessionTimeOut: updatedUser.sessionTimeOut
	};
	await usersBL.updateJsonUser(updateUsersJson);
	let updatePermissionsJson = {
		id: userId,
		permissions: updatedUser.permissions
	};
	await permissionBL.updateUserPermission(updatePermissionsJson);
	let userObj = {
		id: userId,
		username: updateDb.username,
		firstName: updateUsersJson.firstName,
		lastName: updateUsersJson.lastName,
		creationDate: updateUsersJson.creationDate,
		sessionTimeOut: updateUsersJson.sessionTimeOut,
		permissions: updatePermissionsJson.permissions
	};
	return userObj;
};

const deleteUser = async userId => {
	await userBL.deleteUser(userId);
	await permissionBL.deleteUserPermission(userId);
	let result = await usersBL.deleteJsonUser(userId);
	let deleteStr;
	if (result === 'No user with this ID is in the User.json file') {
		deleteStr = 'No user with this ID is in the system';
	}
	else {
		deleteStr = 'User Has Been Deleted From the System Successfully!';
	}
	return deleteStr;
};

module.exports = { getAllUsersData, getUserDataById, addUser, updateUser, deleteUser };
