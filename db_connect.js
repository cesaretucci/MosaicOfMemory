
const mysql = require('mysql2');



const Sequelize = require('sequelize');


const databaseName = 'mom';
const username = 'root';
const password = 'SakuraNarutoSasuke7';
const host = 'localhost';
const dialect = 'mysql'; // or any other supported dialect like 'postgres', 'sqlite', 'mssql', etc.

const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: dialect,

  // Other options:
  // port: 3306, // Specify port if different from default
  // storage: 'path/to/database.sqlite', // For SQLite only
  // logging: false, // Disable logging (default is console.log)
  // dialectOptions: { ... }, // Additional options specific to the dialect
  // define: { ... }, // Model options
});

//sequelize.authenticate().then(() => {
//  console.log("DATABASE CONNECTED");
// })
// .catch((err) => {
//  console.log(err);
//});

module.exports = sequelize;

// MySQL database configuration
//const connection = mysql.createConnection({
 // host: 'your_mysql_host',
  //user: 'your_mysql_user',
  //password: 'your_mysql_password',
  //database: 'your_mysql_database'
//});

// Connect to MySQL database
//connection.connect((err) => {
 // if (err) {
   // console.error('Error connecting to MySQL database:', err);
   // return;
  //}
  //console.log('Connected to MySQL database');
//});



