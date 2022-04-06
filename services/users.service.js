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

   }

   async findOne(id) {

   }

   async update(id, changes) {

   }

   async delete(id) {

   }
}

module.exports = UsersService;
