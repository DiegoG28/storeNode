const StatusCodeError = require('../modules/statusCodeError');

function validateInputs(req, res, next) {
   const body = req.body;
   if (!body.nombre || !body.apellido) {
      const error = new StatusCodeError(400, 'El campo nombre y apellido son necesarios');
      next(error);
   }
   res.locals.body = body;
   next();
}

module.exports = { validateInputs };
