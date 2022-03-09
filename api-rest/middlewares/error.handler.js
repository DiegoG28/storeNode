function errorHandler(error, req, res, next) {
	res.status(error.statusCode).json({
		codigo: error.statusCode,
		mensaje: error.message,
		stack: error.stack
	});
}

module.exports = errorHandler;