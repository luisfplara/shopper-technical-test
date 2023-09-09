const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      port : 3306,
      user : 'root',
      password : 'abcd1234',
      database : 'shoppertest'
    }
  });

  module.exports = { knex }