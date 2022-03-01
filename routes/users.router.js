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
