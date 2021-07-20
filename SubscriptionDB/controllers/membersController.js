const express = require('express');
const router = express.Router();
const memberBL = require('../models/memberBL');

router.route('/').get(async (req, resp) => {
	let members = await memberBL.getAllMembers();
	return resp.json(members);
});

router.route('/:id').get(async (req, resp) => {
	let id = req.params.id;
	let member = await memberBL.getMemberById(id);
	return resp.json(member);
});

router.route('/').post(async (req, resp) => {
	let newMember = req.body;
	let member = await memberBL.addMember(newMember);
	return resp.json(member);
});

router.route('/:id').put(async (req, resp) => {
	let id = req.params.id;
	let updatedMember = req.body;
	let result = await memberBL.updateMember(id, updatedMember);
	return resp.json(result);
});

router.route('/:id').delete(async (req, resp) => {
	let id = req.params.id;
	let result = await memberBL.deleteMember(id);
	return resp.json(result);
});

module.exports = router;
