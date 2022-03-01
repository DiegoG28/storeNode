const express = require('express');
const faker = require('community-faker');

const router = express.Router();

router.get('/', (req, res) => {
   const users = [];
   let { size } = req.query;
   size = size || 10;

   for (let i = 0; i < size; i++){
      users.push({
         name: faker.name.firstName(),
         last: faker.name.lastName(),
         gender: faker.name.gender()
      });
   }
   res.json(users);
})

router.get('/:id', (req, res) => {
   const { id } = req.params;
   if(id === '20'){
      res.status(404).json({
         message: 'Not found'
      });
   } else {
      res.status(200).json({
         id,
         name: faker.name.firstName(),
         last: faker.name.lastName(),
         gender: faker.name.gender()
      });
   }
})

router.post('/', (req, res) => {
   const body = req.body;
   res.status(201).json({
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
