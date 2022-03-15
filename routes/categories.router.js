const express = require('express');
const CategoriesService = require('./../services/categories.service');

const router = express.Router();
const service = new CategoriesService();

router.get('/', async (req, res) => {
   const categories = await service.find();
   res.json(categories);
})

router.get('/:id', async (req, res, next) => {
   try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
   } catch (error) {
      next(error);
   }
})

router.post('/', async (req, res) => {
   const body = req.body;
   const newCategorie = await service.create(body);
   res.json(newCategorie);
})

router.patch('/:id', async (req, res, next) => {
   try {
      const { id } = req.params;
      const body = req.body;
      const categorieChanged = await service.update(id, body);
      res.json(categorieChanged);
   } catch (error) {
      next(error);
   }
})

router.delete('/:id', async (req, res, next) => {
   try {
      const { id } = req.params;
      const categorieDeleted = await service.delete(id);
      res.json(categorieDeleted);
   } catch (error) {
      next(error);
   }
})

module.exports = router;
