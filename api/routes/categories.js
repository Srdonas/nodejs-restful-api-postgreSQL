const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const categoryId = req.params.categoryId;
  const productId = req.params.productId;
  res.json({ categoryId: categoryId, productId: productId });
})

module.exports = router;
