const express = require('express');
const router = express.Router();
const subscriptionBL = require('../models/subscriptionBL');

router.route('/').get(async (req, resp) => {
	let subscriptions = await subscriptionBL.getAllSubscriptions();
	return resp.json(subscriptions);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let subscription = await subscriptionBL.getSubscriptionById(id);
	return resp.json(subscription);
});

router.route('/').post(async (req, resp) => {
	let newSubscription = req.body;
	let subscription = await subscriptionBL.addSubscription(newSubscription);
	return resp.json(subscription);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedSubscription = req.body;
	let result = await subscriptionBL.updateSubscription(id, updatedSubscription);
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	let result = await subscriptionBL.deleteSubscription(id);
	return resp.json(result);
});

module.exports = router;
