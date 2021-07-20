let Member = require('./memberSchema.js');

const getAllMembers = () => {
	return new Promise((resolve, reject) => {
		Member.find({}, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const getMemberById = memberId => {
	return new Promise((resolve, reject) => {
		Member.findById(memberId, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const addMember = newMember => {
	return new Promise((resolve, reject) => {
		let member = new Member({
			name: newMember.name,
			email: newMember.email,
			address: {
				city: newMember.address.city
			}
		});
		member.save(err => {
			if (err) {
				reject(err);
			}
			else {
				resolve(member);
			}
		});
	});
};

const updateMember = (memberId, updatedData) => {
	return new Promise((resolve, reject) => {
		Member.findByIdAndUpdate(
			memberId,
			{
				name: updatedData.name,
				email: updatedData.email,
				address: {
					city: updatedData.address.city
				}
			},
			err => {
				if (err) {
					reject(err);
				}
				else {
					resolve('Member was updated!');
				}
			}
		);
	});
};

const deleteMember = memberId => {
	return new Promise((resolve, reject) => {
		Member.findByIdAndDelete(memberId, err => {
			if (err) {
				reject(err);
			}
			else {
				resolve('Member deleted!!!');
			}
		});
	});
};

module.exports = { getAllMembers, getMemberById, addMember, updateMember, deleteMember };
