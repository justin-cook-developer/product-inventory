const express = require('express');
const router = express.Router();

const { Product } = require('../db/index');

router.get('/', async (req, res, next) => {
  try {
    const prods = await Product.findAll();
    res.json(prods);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let { name, status } = req.body;
    const [prod] = await Product.findOrCreate({
      where: { name },
      defaults: { status },
    });
    res.json(prod);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const prod = await Product.findByPk(id);
    const updatedProd = await prod.update({ status: req.body.status });
    res.json(updatedProd);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
