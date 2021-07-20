const express = require('express');
const router = express.Router();
const accountsBL = require('../models/UsersDBDAL');

router.route('/').get(async (req, resp) => {
	let accounts = await accountsBL.getAllUsers();
	return resp.json(accounts);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let account = await accountsBL.getUserById(id);
	return resp.json(account);
});

router.route('/').post(async (req, resp) => {
	let newAccount = req.body;
	let account = await accountsBL.addUser(newAccount);
	return resp.json(account);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedAccount = req.body;
	let result = await accountsBL.updateUser(id, updatedAccount);
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	let result = await accountsBL.deleteUser(id);
	return resp.json(result);
});

module.exports = router;
