const express = require('express');
const faker = require('faker');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
   res.send('My server in express');
});

//Endpoint básico, usamos faker para generar datos
// app.get('/products', (req, res) => {
//    const products = [];
//    for (let i = 0; i < 100; i++){
//       products.push({
//          name: faker.commerce.productName(),
//          price: parseInt(faker.commerce.price(), 10),
//          image: faker.image.imageUrl()
//       });
//    }
//    res.json(products);
// });

//Endpoint que recibe argumentos
app.get('/products/:id', (req, res) => {
   const { id } = req.params;
   res.json({
      id,
      product: 'Product 1',
      price: 1000
   });
});

//Endpoint que recibe 2 argumentos
app.get('/categories/:categoryId/products/:productId', (req, res) => {
   const { categoryId, productId } = req.params;
   res.json({
      categoryId,
      productId
   });
});

//Endpoint con parámetros query
app.get('/users', (req, res) => {
   const { limit, offset } = req.query;

   if(limit && offset){
      res.json({
         limit,
         offset
      });
   } else {
      res.send('Aquí iría toda la información sin filtros');
   }
});

//Endpoint con parámetros query que nos permitirán filtrar información
app.get('/products', (req, res) => {
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

app.listen(port, () => {
   console.log('My port: ' + port);
});
