const { default: axios } = require('axios');
const express = require('express');
const router = express.Router();

router.route('/').get(async (req, resp) => {
	let subscriptions = await (await axios.get('http://localhost:8090/subscriptions')).data;
	return resp.json(subscriptions);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let subscriptions = await (await axios.get(`http://localhost:8090/subscriptions/${id}`)).data;
	return resp.json(subscriptions);
});

router.route('/').post(async (req, resp) => {
	let newSub = req.body;
	let result = await (await axios.post('http://localhost:8090/subscriptions', newSub)).data;
	return resp.json(result);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedSub = req.body;
	let result = await (await axios.post(`http://localhost:8090/subscriptions/${id}`, updatedSub)).data;
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	let result = await (await axios.delete(`http://localhost:8090/subscriptions/${id}`)).data;
	return resp.json(result);
});

module.exports = router;
