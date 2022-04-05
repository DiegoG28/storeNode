const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT ||3000;

app.use(express.json());

const whitelist = ['http://127.0.0.1:5500', 'http://localhost'];
const options = {
   origin: (origin, callback) => {
      (whitelist.includes(origin) || !origin)
      ? callback(null, true)
      : callback(new Error('This origin is not allowed'));
   }
}
app.use(cors(options));

app.get('/', (req, res) => {
   res.send('My server in express');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(ormErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
   console.log('My port: ' + port);
});
