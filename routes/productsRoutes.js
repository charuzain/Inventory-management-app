const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();



const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

module.exports = ({getAllProducts,getSingleProduct,getProducts,getAllWarehouses})=>{

   

  router.get('/',(req,res)=>{
    getAllProducts().then(products =>{
      console.log(products[1].location);
      console.log({products});
      res.render('products' ,{products});
    });
  
    
  });

 


  router.get('/new',(req,res)=>{
    getAllWarehouses().then(warehouses=>{
      res.render('new_product',{warehouses});
    });
   
  });

 
  router.post('/',(req,res)=>{
    console.log(`name is ${req.body.name}`);
    console.log(req.body);
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