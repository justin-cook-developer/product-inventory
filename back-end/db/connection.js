const Sequelize = require('sequelize');

const Model = Sequelize.Model;
const connection = new Sequelize('postgres://localhost:5432/products', {
  dialect: 'postgres'
});

module.exports = {
  Model,
  connection,
}
