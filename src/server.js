const app = require('./app');
const { db } = require('./database/config');

db.authenticate()
  .then(() => console.log('database connected...'))
  .catch((err) => console.log(err));

db.sync({ force: true })
  .then(() => console.log('database sincronized'))
  .catch((err) => console.log(err));

const PORT = 3000;
app.listen(PORT, () => console.log('running on port 3000'));
