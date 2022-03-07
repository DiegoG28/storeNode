const userRouter = require('./user.router');

function routerApi(app) {
   app.use('/users', userRouter);
}

module.exports = routerApi;