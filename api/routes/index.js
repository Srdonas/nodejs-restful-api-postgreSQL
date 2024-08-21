const express = require('express');

const productsRouter = require('./products.js');
const usersRouter = require('./users.js');
const categoriesRouter = require('./categories.js');

function routersApi(app){
  const router = express.Router();
  //Cuando hacemos API's es bueno agregar
  //a la ruta /api/v1 como buena practica
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);

}

module.exports = routersApi;
