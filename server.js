'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('note:server');

// const cors = require('./lib/cors-middleware.js');
const appleRouter = require('./route/apple-router.js');
// const errorMiddleware = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.use(appleRouter);

// app.use(errorMiddleware);
// app.use(cors);

app.listen(PORT, function(){
  debug(`server up ${PORT}`);
});
