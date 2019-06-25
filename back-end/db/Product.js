const Sequelize = require('sequelize');
const { connection, Model } = require('./connection');

class Product extends Model {}
Model.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    status: {
      type: Sequelize.ENUM('INSTOCK', 'BACKORDERED', 'DISCONTINUED'),
      defaultValue: 'INSTOCK',
    },
  },
  { sequelize: connection, modelName: 'product' }
);

module.exports = Product;
