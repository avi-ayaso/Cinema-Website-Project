let Subscription = require('./subscriptionSchema');

const getAllSubscriptions = () => {
	return new Promise((resolve, reject) => {
		Subscription.find({}, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const getSubscriptionById = subscriptionId => {
	return new Promise((resolve, reject) => {
		Subscription.findById(subscriptionId, (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data);
			}
		});
	});
};

const addSubscription = newSubscription => {
	return new Promise((resolve, reject) => {
		let subscription = new Subscription({
			memberId: newSubscription.memberId,
			movies: newSubscription.movies
		});
		subscription.save(err => {
			if (err) {
				reject(err);
			}
			else {
				resolve(subscription);
			}
		});
	});
};

const updateSubscription = (subscriptionId, updatedData) => {
	return new Promise((resolve, reject) => {
		Subscription.findByIdAndUpdate(
			subscriptionId,
			{
				memberId: updatedData.memberId,
				movies: updatedData.movies
			},
			err => {
				if (err) {
					reject(err);
				}
				else {
					resolve('Subscription was updated!');
				}
			}
		);
	});
};

const deleteSubscription = subscriptionId => {
	return new Promise((resolve, reject) => {
		Subscription.findByIdAndDelete(subscriptionId, err => {
			if (err) {
				reject(err);
			}
			else {
				resolve('Subscription deleted!!!');
			}
		});
	});
};

module.exports = { getAllSubscriptions, getSubscriptionById, addSubscription, updateSubscription, deleteSubscription };
