const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : process.env.MYSQL_ADDRESS,
      port : process.env.MYSQL_PORT,
      user : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASSWORD,
      database : process.env.MYSQL_DATABASE
    }
  });

  module.exports = { knex }