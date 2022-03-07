const faker = require('community-faker');

class UsersService {

   constructor() {
      this.users = [];
      this.generate();
   }

   generate() {
      const size = 100;
      for (let i = 0; i < size; i++) {
         this.users.push({
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            last: faker.name.lastName(),
            gender: faker.name.gender()
         });
      }
   }

   create(data) {
      const newUser = {
         id: faker.datatype.uuid(),
         ...data
      };
      this.users.push(newUser);
      return newUser;
   }

   find() {
      return this.users;
   }

   findOne(id) {
      return this.users.find(item => item.id === id);
   }

   update(id, changes) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
         throw new Error('user not found');
      }
      const user = this.users[index];
      const userChanged = {
         ...user,
         ...changes
      };
      this.users[index] = userChanged;
      return userChanged;
   }

   delete(id) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
         throw new Error('user not found');
      }
      this.users.splice(index, 1);
      return { id };
   }
}

module.exports = UsersService;
