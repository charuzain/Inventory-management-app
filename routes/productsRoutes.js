const express = require("express");
const router = express.Router();
// const getAllProducts = require("../helpers/dbHelpers").getAllProducts;
// console.log(getAllProducts);

const app = express();
app.set("view engine", "ejs");

module.exports = ({getAllProducts,getSingleProduct,getProducts})=>{

   

  router.get('/',(req,res)=>{
    getAllProducts().then(val =>{
      console.log(val);
      console.log({val});
      res.render('products' ,{val});
    });
  
    
  });

  router.get('/:id',(req,res)=>{
    const id = req.params.id;
    getSingleProduct(id)
      .then((product)=>{
        res.json(product);
      })
      .catch((err) => res.json({
        error: err.message
      }));
  });

  return router;
};