const express = require("express");
const router = express.Router();

const app = express();
app.set("view engine", "ejs");

module.exports = ({getAllWarehouses})=>{

   

  router.get('/',(req,res)=>{
    getAllWarehouses().then(warehouses => {
      console.log(warehouses);
      console.log({warehouses});
      res.render('warehouse',{warehouses});
    });


    router.get('/new',(req,res)=>{
      res.render('new_warehouse');
    });
  
    
  });



  return router;
};