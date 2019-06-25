const { connection, Product } = require('./back-end/db/index');

const letters = ['a', 'b', 'c', 'd', 'e'];

const products = letters.map(letter => ({ name: letter }));

connection
  .sync({ force: true })
  .then(() => {
    products.forEach(product => {
      Product.create(product);
    });
  })
  .catch(console.error);
