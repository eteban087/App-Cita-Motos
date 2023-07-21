const express = require('express');
const morgan = require('morgan');
const usersRoutes = require('./routes/users.routes');
const repairsRoutes = require('./routes/repairs.routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/repairs', repairsRoutes);

module.exports = app;
