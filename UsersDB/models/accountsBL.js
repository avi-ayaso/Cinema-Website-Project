let Account = require('./userSchema.js');

const getAllAccounts = () => {
	return new Promise((resolve, reject) => {
		Account.find({}, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const getAccountById = accountId => {
	return new Promise((resolve, reject) => {
		Account.findById(accountId, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const addAccount = newAccount => {
	return new Promise((resolve, reject) => {
		let account = new Account({
			username: newAccount.username,
			password: newAccount.password
		});
		account.save(err => {
			if (err) {
				reject(err);
			}
			else {
				resolve(account);
			}
		});
	});
};

const updateAccount = (accountId, updatedData) => {
	return new Promise((resolve, reject) => {
		Account.findByIdAndUpdate(
			accountId,
			{
				username: updatedData.username,
				password: updatedData.password
			},
			err => {
				if (err) {
					reject(err);
				}
				else {
					resolve('Account was updated!');
				}
			}
		);
	});
};

const deleteAccount = accountId => {
	return new Promise((resolve, reject) => {
		Account.findByIdAndDelete(accountId, err => {
			if (err) {
				reject(err);
			}
			else {
				resolve('Account deleted');
			}
		});
	});
};

module.exports = { getAllAccounts, getAccountById, addAccount, updateAccount, deleteAccount };
