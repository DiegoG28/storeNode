const express = require('express');

const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res) => {
    const user = service.find();
    res.json(user);
});

router.get('/:id', (req, res) => {
    const {id} = req.params;
    const user = service.findOne(id);
    res.json(user);
});

router.post('/', (req, res) => {
    const body = req.body;
    const newUser = service.validate(body);
    res.json(newUser);
});

router.put('/:id', (req, res) => {
	const {id} = req.params;
	const body = req.body;
	const usuarioActualizado = service.update(id, body);
	res.json(usuarioActualizado);
})

router.delete('/:id', (req, res) => {
	const {id} = req.params;
	const usuarioEliminado = service.delete(id);
	res.json(usuarioEliminado);
})

module.exports = router;