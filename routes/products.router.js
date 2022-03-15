const express = require('express');

const ProductsService = require('./../services/products.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema');
const { getUserSchema } = require('../schemas/user.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
   const products = await service.find();
   res.json(products);
});

router.get('/:id',
   validatorHandler(getProductSchema, 'params'),
   async (req, res, next) => {
      try {
         const { id } = req.params;
         const product = await service.findOne(id);
         res.json(product);
      } catch (error) {
         next(error);
      }
   }
);

router.post('/',
   validatorHandler(createProductSchema, 'body'),
   async (req, res) => {
      const body = req.body;
      const newProduct = await service.create(body);
      res.json(newProduct);
   }
);

router.patch('/:id',
   validatorHandler(getProductSchema, 'params'),
   validatorHandler(updateProductSchema, 'body'),
   async (req, res, next) => {
      try {
         const { id } = req.params;
         const body = req.body;
         const productChanged = await service.update(id, body);
         res.json(productChanged);
      } catch (error) {
         next(error);
      }
   }
);

router.delete('/:id',
   validatorHandler(getUserSchema, 'params'),
   async (req, res, next) => {
      try {
         const { id } = req.params;
         const productDeleted = await service.delete(id);
         res.json(productDeleted);
      } catch (error) {
         next(error);
      }
   }
);

module.exports = router;
