const express = require('express');
const router = express.Router();
const { default: axios } = require('axios');

router.route('/').get(async (req, resp) => {
	let prom = await axios.get('http://localhost:8090/members');
	let members = prom.data;
	return resp.json(members);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let member = await (await axios.get(`http://localhost:8090/members/${id}`)).data;
	console.log(member);
	return resp.json(member);
});

router.route('/').post(async (req, resp) => {
	let newMember = req.body;
	let result = await (await axios.post('http://localhost:8090/members', newMember)).data;
	console.log(result);
	return resp.json(result);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedMember = req.body;
	let result = await (await axios.put(`http://localhost:8090/members/${id}`, updatedMember)).data;
	console.log(result);
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	console.log(id);
	let result = await (await axios.delete(`http://localhost:8090/members/${id}`)).data;
	console.log(result);
	return resp.json(result);
});

module.exports = router;
