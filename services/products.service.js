const faker = require('community-faker');

class ProductsService {

   constructor() {
      this.products = [];
      this.generate();
   }

   generate() {
      const size = 100;
      for (let i = 0; i < size; i++) {
         this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl()
         });
      }
   }

   create(data) {
      const newProduct = {
         id: faker.datatype.uuid(),
         ...data
      };
      this.products.push(newProduct);
      return newProduct;
   }

   find() {
      return this.products;
   }

   findOne(id) {
      return this.products.filter(item => item.id === id);
   }

   update(id, changes) {
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
         throw new Error('product not found');
      }
      const product = this.products[index];
      const productChanged = {
         ...product,
         ...changes
      }
      this.products[index] = productChanged;
      return productChanged;
   }

   delete(id) {
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
         throw new Error('product not found');
      }
      this.products.splice(index, 1);
      return { id };
   }

}

module.exports = ProductsService;
