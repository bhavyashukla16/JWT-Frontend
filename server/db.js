require('dotenv').config()

const util = require("util");
const mysql = require("mysql");

const pool = mysql.createPool({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
  });

  pool.getConnection((err, connection) =>{
      if(err){
          console.log(err);
      }else{
          console.log("mysql connected!");
      }
});

  
  pool.query = util.promisify(pool.query);
  module.exports = pool;