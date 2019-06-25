const express = require('express');
const morgan = require('morgan');
const path = require('path');

const { connection } = require('./db/index');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../front-end', 'dist')));

app.use('/api', require('./api/index'));

app.use((req, res, next) => {
  try {
    res.status(404).send('Page not found. This is an invalid route.');
  } catch (e) {
    next(e);
  }
});

app.use((e, req, res, next) => {
  console.error(e);
  next(e);
});

const PORT = process.env.PORT || 3000;

connection
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(e => console.error(e));
