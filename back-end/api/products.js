const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    res.send('hi');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
