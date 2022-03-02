const express = require('express');
const CategoriesService = require('./../services/categories.service');

const router = express.Router();
const service = new CategoriesService();

router.get('/', (req, res) => {
   const categories = service.find();
   res.json(categories);
})

router.get('/:id', (req, res) => {
   const { id } = req.params;
   const category = service.findOne(id);
   res.json(category);
})

router.post('/', (req, res) => {
   const body = req.body;
   const newCategorie = service.create(body);
   res.json(newCategorie);
})

router.patch('/:id', (req, res) => {
   const { id } = req.params;
   const body = req.body;
   const categorieChanged = service.update(id, body);
   res.json(categorieChanged);
})

router.delete('/:id', (req, res) => {
   const { id } = req.params;
   const categorieDeleted = service.delete(id);
   res.json(categorieDeleted);
})

module.exports = router;
