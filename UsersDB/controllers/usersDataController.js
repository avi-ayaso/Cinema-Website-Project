const express = require('express');
const router = express.Router();
const AllBL = require('../models/AllBL');

router.route('/').get(async (req, resp) => {
	let users = await AllBL.getAllUsersData();
	return resp.json(users);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let user = await AllBL.getUserDataById(id);
	return resp.json(user);
});

router.route('/').post(async (req, resp) => {
	let newUser = req.body;
	let user = await AllBL.addUser(newUser);
	return resp.json(user);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedUser = req.body;
	let result = await AllBL.updateUser(id, updatedUser);
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	let result = await AllBL.deleteUser(id);
	return resp.json(result);
});

module.exports = router;
