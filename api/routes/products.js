const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middleware/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductsSchema,
  deleteProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.getProducts();
  res.json(products);
});

router.get('/:id',
validatorHandler(getProductsSchema, 'params'),
 async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    //Ejecutando los middlewares para errores
    next(error);
  }
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
  const product = req.body;
  const newProduct = await service.create(product);
  res.status(201).json({
    message: 'Producto creado correctamente',
    product: newProduct,
  });
});

router.put('/:id',
  validatorHandler(getProductsSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedProduct = await service.updateProduct(id, data);
    res.status(200).json({
      message: 'Producto actualizado correctamente',
      product: updatedProduct,
      id: id,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteProduct = await service.delete(id);
    res.status(200).json({
      message: 'Producto eliminado correctamente',
      id: deleteProduct,
    });
  } catch (error) {
    next(error);
  }
});
// router.patch('/:id', (req, res) => {
//   const id = req.params.id;
//   const product = req.body;
//   res.status(200).json({
//     message: 'Producto actualizado correctamente',
//     product: product,
//     id: id
//   })
// });

// router.get('/filter', (req, res) => {
//   res.send('Yo soy un filter');
// });
module.exports = router;
