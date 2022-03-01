const express = require('express');
const faker = require('community-faker');

const router = express.Router();

router.get('/', (req, res) => {
   const categories = [];
   let { size } = req.query;
   size = size || 10;

   for (let i = 0; i < size; i++){
      categories.push({
         category: faker.commerce.department()
      });
   }
   res.json(categories);
})

router.post('/', (req, res) => {
   const body = req.body;
   res.json({
      message: 'Create',
      data: body
   });
})

router.patch('/:id', (req, res) => {
   const { id } = req.params;
   const body = req.body;
   res.json({
      message: 'Update',
      data: body,
      id
   });
})

router.delete('/:id', (req, res) => {
   const { id } = req.params;
   res.json({
      message: 'Delete',
      id
   });
})

module.exports = router;
