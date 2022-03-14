const express = require('express');
const UserService = require('../services/user.service');
const { validateInputs } = require('../middlewares/validate');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res, next) => {
	try {
		const user = service.find();
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.get('/:id', (req, res, next) => {
	try {
		const { id } = req.params;
		const user = service.findOne(id);
		res.json(user);
	} catch (error) {
		next(error);
	}
});

router.post('/', validateInputs, (req, res, next) => {
	try {
		const newUser = service.create(res.locals.body);
		res.status(200).json(newUser);
	} catch (error) {
		next(error);
	}
});

router.put('/:id', validateInputs, (req, res, next) => {
	try {
		const { id } = req.params;
		const changedUser = service.update(id, res.locals.body);
		res.status(200).json(changedUser);
	} catch (error) {
		next(error);
	}
})

router.delete('/:id', (req, res, next) => {
	try {
		const { id } = req.params;
		const deletedUser = service.delete(id);
		res.json(deletedUser);
	} catch (error) {
		next(error);
	}
})

module.exports = router;
