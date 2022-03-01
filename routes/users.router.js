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

module.exports = router;