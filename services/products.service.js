const boom = require('@hapi/boom');

const pool = require('../libs/postgres.pool');

class ProductsService {

   constructor() {
      this.pool = pool;
      this.pool.on('error', (err) => console.log(err));
   }

   async create(data) {

   }

   async find() {
      const queryText = 'SELECT * FROM tasks';
      const res = await this.pool.query(queryText);
      return res.rows;
   }

   async findOne(id) {

   }

   async update(id, changes) {

   }

   async delete(id) {

   }

}

module.exports = ProductsService;
