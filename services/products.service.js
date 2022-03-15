const faker = require('community-faker');
const boom = require('@hapi/boom');

class ProductsService {

   constructor() {
      this.products = [];
      this.generate();
   }

   async generate() {
      const size = 100;
      for (let i = 0; i < size; i++) {
         this.products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),
            isBlock: faker.datatype.boolean()
         });
      }
   }

   async create(data) {
      const newProduct = {
         id: faker.datatype.uuid(),
         ...data
      };
      this.products.push(newProduct);
      return newProduct;
   }

   async find() {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(this.products);
         }, 3000);
      })
   }

   async findOne(id) {
      const product = this.products.find(item => item.id === id);
      if (!product) {
         throw boom.notFound('product not found');
      }
      if(product.isBlock) {
         throw boom.conflict('product is blocked');
      }
      return product;
   }

   async update(id, changes) {
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
         throw boom.notFound('product not found');
      }
      const product = this.products[index];
      const productChanged = {
         ...product,
         ...changes
      }
      this.products[index] = productChanged;
      return productChanged;
   }

   async delete(id) {
      const index = this.products.findIndex(item => item.id === id);
      if (index === -1) {
         throw boom.notFound('product not found');
      }
      this.products.splice(index, 1);
      return { id };
   }

}

module.exports = ProductsService;
