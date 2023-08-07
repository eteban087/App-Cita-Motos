const express = require('express');
const morgan = require('morgan');
const usersRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');

const globalErrorHandler = require('./controller/error.controller');
const AppError = require('./helpers/appError');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRoutes);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`the URL ${req.originalUrl} does not exist on this server`)
  );
});

app.use(globalErrorHandler);

module.exports = app;
