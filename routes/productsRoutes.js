const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();


const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

module.exports = ({getAllProducts,getSingleProduct,getAllWarehouses,addNewProduct,updateProduct})=>{

   

  router.get('/',(req,res)=>{
    getAllProducts().then(products =>{
      console.log(products[1].location);
      console.log({products});
      res.render('products' ,{products});
    });
  
    
  });



 
  // Create new product

  router.get('/new',(req,res)=>{
    getAllWarehouses().then(warehouses=>{
      res.render('new_product',{warehouses});
    });
   
  });

  router.get('/:id',(req,res)=>{
    
    const id = req.params.id;
    // console.log(id);
    getSingleProduct(id).then(product =>{
      // console.log(product);
      res.render('single_product',{product});
    });
    
      
      
  });


  router.get('/:id/edit',(req,res)=>{
    
    const id = req.params.id;
    console.log(id);
    getSingleProduct(id).then(product =>{
      getAllWarehouses().then(warehouses=>{
        // console.log(warehouses);
        res.render('edit_product' , {product , warehouses});
      });
    });
  });

  router.post('/:id',(req,res)=>{
    const id = req.params.id;
    const {name,description,price,totalquantity,location} = req.body;
    getSingleProduct(id).then(response =>{
      if (response) {
        return updateProduct(name,description,price,totalquantity,location);
      }


    });

  });
    
      
      


  




  
 
  router.post('/',(req,res)=>{
    console.log(`name is ${req.body.name}`);
    console.log(req.body);
    const name = req.body.name;
    const description = req.body.name;
    const price = req.body.price;
    const quantity = req.body.totalquantity;
    const location = req.body.location;
   
    addNewProduct(name,description,price,quantity,location).then(value=>{
      console.log(value);
      res.redirect('/products');
    }
    );



  });



  // router.get('/:id',(req,res)=>{
  //   const id = req.params.id;
  //   getSingleProduct(id)
  //     .then((product)=>{
  //       res.json(product);
  //     })
  //     .catch((err) => res.json({
  //       error: err.message
  //     }));
  // });



  return router;
};