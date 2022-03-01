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

module.exports = router;
