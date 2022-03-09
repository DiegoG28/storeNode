const express = require('express');

const UserService = require('../services/user.service');

const { validateInputs, validatePost, validateGet, validateId } = require('../middlewares/validate');

const router = express.Router();
const service = new UserService();

router.get('/', validateGet(service), (req, res) => {
	const user = service.find();
	res.json(user);
});

router.get('/:id', validateId(service), (req, res) => {
	const user = service.findOne(res.locals.id);
	res.json(user);
});

router.post('/', validateInputs, validatePost(service), (req, res) => {
	const newUser = service.create(res.locals.body);
	res.status(200).json(newUser);
});

router.put('/:id', validateInputs, validateId(service), (req, res) => {
	const changedUser = service.update(res.locals.id, res.locals.body);
	res.status(200).json(changedUser);
})

router.delete('/:id', validateId(service), (req, res) => {
	const deletedUser = service.delete(res.locals.id);
	res.json(deletedUser);
})

module.exports = router;
