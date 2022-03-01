const express = require('express');
const faker = require('community-faker');

const router = express.Router();

router.get('/', (req, res) => {
   const products = [];
   let { size } = req.query;
   size = size || 10;

   for (let i = 0; i < size; i++){
      products.push({
         name: faker.commerce.productName(),
         price: parseInt(faker.commerce.price(), 10),
         image: faker.image.imageUrl()
      });
   }
   res.json(products);
});

router.get('/filter', (req, res) => {
   res.send('Soy una subpágina');
})

router.get('/:id', (req, res) => {
   const { id } = req.params;
   res.json({
      id,
      product: 'Product 1',
      price: 1000
   });
});

module.exports = router;
