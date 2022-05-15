const express = require('express');
const app = express();
const PORT = 8080;

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
  res.render('nav');
});

app.listen(PORT ,()=>{
  console.log(`app is listening on port ${PORT}`);
});