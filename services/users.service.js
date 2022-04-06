const boom = require('@hapi/boom');

const { User } = require('../db/models/user.model');

class UsersService {

   constructor() {

   }

   async create(data) {
      const newUser = await User.create(data);
      return newUser;
   }

   async find() {
      const users = await User.find();
      return users;
   }

   async findOne(id) {

   }

   async update(id, changes) {

   }

   async delete(id) {

   }
}

module.exports = UsersService;
