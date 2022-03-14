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

module.exports = { validateInputs };