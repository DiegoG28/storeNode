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
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
   });
});

router.post('/', (req, res) => {
   const body = req.body;
   res.json({
      message: 'created',
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
