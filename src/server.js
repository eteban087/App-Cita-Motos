const dotenv = require('dotenv').config();
const app = require('./app');
const { db } = require('./database/config');
const initModel = require('./models/initModel');

db.authenticate()
  .then(() => console.log('database connected...'))
  .catch((err) => console.log(err));

initModel();

db.sync({ force: false })
  .then(() => console.log('database sincronized'))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`running on port ${PORT}`));
