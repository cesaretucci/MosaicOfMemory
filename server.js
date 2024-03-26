const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes')

var http = require('http');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('./public'));
var corsOptions = {
	origin: 'http://localhost:8080/'
};


app.use(cors(corsOptions));

const User= require('./models/userModel');
const Card = require('models/cardModel');

const database = require('./db_connect');

//database.authenticate().then(() => {
 // console.log("DATABASE CONNECTED");
// })
// .catch((err) => {
 // console.log(err);
//});

const initApp = async () => {
  console.log("Testing the database connection..");

  // Test the connection.
  // You can use the .authenticate() function to test if the connection works.

  try {
     await database.authenticate();
     console.log("Connection has been established successfully.");

     User.sync({ alter: true });
     Card.sync({alter: true});

     // Start the web server on the specified port.
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
     console.error("Unable to connect to the database:", error);
  }
};

initApp();


// Use the router for all routes starting with '/api'
app.use('/api', routes);

//database.sequelize.sync({ force: true }).then(() => {
 // console.log('Database synchronized');
//}).catch(err => {
 // console.error('Error synchronizing database:', err);
//});

// Define your routes and other middleware here



// Define a route to handle GET requests to the root URL
app.get('/', (req, res) => {
  res.sendFile('./public/index.html');
});


