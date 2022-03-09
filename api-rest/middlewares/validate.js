const StatusCodeError = require('../modules/statusCodeError');

function validateInputs(req, res, next) {
	try {
		const body = req.body;
		if (!body.nombre || !body.apellido) {
			throw new StatusCodeError(400, 'El campo nombre y apellido son necesarios');
		} else {
			res.locals.body = body;
			next();
		}
	} catch (error) {
		next(error);
	}
}

function validatePost(service) {
	return (req, res, next) => {
		try {
			const body = req.body;
			if (service.findName(body.nombre) || service.findLast(body.apellido)) {
				throw new StatusCodeError(502, 'El usuario ya fue registrado');
			} else {
				next();
			}
		} catch (error) {
			next(error);
		}
	}
}

function validateGet(service) {
	return (req, res, next) => {
		try {
			if (service.usuarios.length > 0) {
				next();
			} else {
				throw new StatusCodeError(404, 'Datos no encontrados');
			}
		} catch (error) {
			next(error);
		}
	}
}

function validateId(service) {
	return (req, res, next) => {
		try {
			const { id } = req.params;
			if (!service.findOne(id)) {
				throw new StatusCodeError(404, 'Usuario no encontrado');
			} else {
				res.locals.id = id;
				next();
			}
		} catch (error) {
			next(error);
		}
	}
}

module.exports = { validateInputs, validatePost, validateGet, validateId };