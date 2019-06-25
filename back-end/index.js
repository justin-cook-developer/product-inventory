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

const PORT = process.env.PORT || 3000;

connection
  .sync()
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(e => console.error(e));

