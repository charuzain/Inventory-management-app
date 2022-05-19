
require('dotenv').config();
const {ENVIROMENT, PORT} = process.env;
const express = require('express');

const morgan = require('morgan');
const bodyParser = require('body-parser');

// db connection
const db = require('./db/index');

const app = express();
// const enviroment = 'dev';

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());
// set the view engine to ejs
app.set('view engine', 'ejs');

const dbHelpers = require("./helpers/dbHelpers")(db);

const productsRoutes = require("./routes/productsRoutes");


app.use("/products",productsRoutes(dbHelpers));



app.get('/',(req,res)=>{
  res.render('dashboard');
});

app.listen(PORT ,()=>{
  console.log(`app is listening on port ${PORT}`);
});