const express = require("express");
const bodyParser = require("body-parser");

const router = express.Router();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

module.exports = ({getAllWarehouses,addNewWarehouse,getSingleWarehouse})=>{

   

  router.get('/',(req,res)=>{
    getAllWarehouses().then(warehouses => {
      console.log(warehouses);
      console.log({warehouses});
      res.render('warehouses',{warehouses});
    });
  });

  router.get('/new',(req,res)=>{
    res.render('new_warehouse');
  });


  router.get('/:id',(req,res)=>{
    
    const id = req.params.id;
    // console.log(id);
    getSingleWarehouse(id).then(warehouse =>{
      res.render('single_warehouse',{warehouse});
    });
    
      
      
  });



  router.post('/',(req,res)=>{

    const name = req.body.name;
    const address = req.body.address;
    const city = req.body.city;

    const state = req.body.state;

    const country  = req.body.country;

    const zip = req.body.zip;



    addNewWarehouse(name , address , city , state , country , zip).then(value=>{
      console.log(value);
      console.log(`value is ${value}`);

      res.redirect('/warehouses');
       
    });

  });
  
    

  

    

 




  return router;
};