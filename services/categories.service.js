const faker = require('community-faker');

class CategoriesService {

   constructor() {
      this.categories = [];
      this.generate();
   }

   generate() {
      const size = 10;
      for (let i = 0; i < size; i++){
         this.categories.push({
            id: faker.datatype.uuid(),
            category: faker.commerce.department()
         });
      }
   }

   create(data) {
      const newCategorie ={
         id: faker.datatype.uuid(),
         ...data
      }
      this.categories.push(newCategorie);
      return newCategorie;
   }

   find() {
      return this.categories;
   }

   findOne(id) {
      return this.categories.find(item => item.id === id);
   }

   update(id, changes) {
      const index = this.categories.findIndex(item => item.id === id);
      if(index === -1){
         throw new Error ('categorie not found');
      }
      const categorie = this.categories[index];
      const categorieChanged = {
         ...categorie,
         ...changes
      };
      this.categories[index] = categorieChanged;
      return categorieChanged;
   }

   delete(id) {
      const index = this.categories.findIndex(item => item.id === id);
      if(index === -1){
         throw new Error ('categorie not found');
      }
      this.categories.splice(index, 1);
      return { id };
   }
}

module.exports = CategoriesService;
