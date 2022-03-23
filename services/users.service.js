const faker = require('community-faker');
const boom = require('@hapi/boom');

const getConnection = require('./../libs/postgres');

class UsersService {

   constructor() {
      this.users = [];
      this.generate();
   }

   async generate() {
      const size = 100;
      for (let i = 0; i < size; i++) {
         this.users.push({
            id: faker.datatype.uuid(),
            name: faker.name.firstName(),
            last: faker.name.lastName(),
            gender: faker.name.gender(),
            isBlock: faker.datatype.boolean()
         });
      }
   }

   async create(data) {
      const newUser = {
         id: faker.datatype.uuid(),
         ...data
      };
      this.users.push(newUser);
      return newUser;
   }

   async find() {
      const client = await getConnection();
      const res = await client.query('SELECT * FROM public.tasks');
      return res.rows;
   }

   async findOne(id) {
      const user = this.users.find(item => item.id === id);
      if (!user) {
         throw boom.notFound('user not found');
      }
      if(user.isBlock){
         throw boom.conflict('user is blocked');
      }
      return user;
   }

   async update(id, changes) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
         throw boom.notFound('user not found');
      }
      const user = this.users[index];
      const userChanged = {
         ...user,
         ...changes
      };
      this.users[index] = userChanged;
      return userChanged;
   }

   async delete(id) {
      const index = this.users.findIndex(item => item.id === id);
      if (index === -1) {
         throw boom.notFound('user not found');
      }
      this.users.splice(index, 1);
      return { id };
   }
}

module.exports = UsersService;
