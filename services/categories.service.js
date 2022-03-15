const faker = require('community-faker');
const boom = require('@hapi/boom');

class CategoriesService {

   constructor() {
      this.categories = [];
      this.generate();
   }

   async generate() {
      const size = 10;
      for (let i = 0; i < size; i++) {
         this.categories.push({
            id: faker.datatype.uuid(),
            category: faker.commerce.department(),
            isBlock: faker.datatype.boolean()
         });
      }
   }

   async create(data) {
      const newCategorie = {
         id: faker.datatype.uuid(),
         ...data
      }
      this.categories.push(newCategorie);
      return newCategorie;
   }

   async find() {
      return new Promise((resolve, reject) => {
         setTimeout(() => {
            resolve(this.categories);
         }, 3000);
      })
   }

   async findOne(id) {
      const categorie = this.categories.find(item => item.id === id);
      if (!categorie) {
         throw boom.notFound('categorie not found');
      }
      if (categorie.isBlock) {
         throw boom.conflict('categorie is blocked');
      }
      return categorie;
   }

   async update(id, changes) {
      const index = this.categories.findIndex(item => item.id === id);
      if (index === -1) {
         throw boom.notFound('categorie not found');
      }
      const categorie = this.categories[index];
      const categorieChanged = {
         ...categorie,
         ...changes
      };
      this.categories[index] = categorieChanged;
      return categorieChanged;
   }

   async delete(id) {
      const index = this.categories.findIndex(item => item.id === id);
      if (index === -1) {
         throw boom.notFound('categorie not found');
      }
      this.categories.splice(index, 1);
      return { id };
   }
}

module.exports = CategoriesService;
