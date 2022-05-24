
module.exports = (db) => {

  const getAllProducts = () => {
    const query = `SELECT prod.id, prod.name,prod.price, prod.description,prod.quantity,sum(pc.product_id) , array_agg(ware.name) as  location ,array_agg(ware.id) as  warehouseid from products prod 
              LEFT JOIN product_warehouse pc on prod.id = pc.product_id
              FULL JOIN warehouses ware ON ware.id=pc.warehouse_id 
              GROUP BY prod.id, prod.name,prod.price, prod.description,prod.quantity ORDER BY 1 DESC
             `;
   
    return db
      .query(query)
      .then((result) => {
        // console.log(result.rows);
        return result.rows;
      })
      .catch((err) => err);
  };


  
  const getSingleProduct = (id) => {
    const query = {
      text: `SELECT prod.id, prod.name,prod.price, prod.description,prod.quantity,sum(pc.product_id) , array_agg(ware.name) as  location from products prod 
              LEFT JOIN product_warehouse pc on prod.id = pc.product_id
              FULL JOIN warehouses ware ON ware.id=pc.warehouse_id 
              WHERE prod.id = $1
              GROUP BY prod.id, prod.name,prod.price, prod.description,prod.quantity ORDER BY 1 DESC
             `,
      values: [id],
    };
    return db
      .query(query)
      
      .then((result) => {
        // console.log(result.rows[0]);
        return result.rows[0];
      })
      .catch((err) => err);
  };

  // select warehouses.* , count(product_id) as total from warehouses join product_warehouse ON warehouses.id = warehouse_id  GROUP BY warehouses.id;

  const getAllWarehouses = ()=>{
    const query = {
      text: `select warehouses.* , count(product_id) as total from warehouses 
      FULL join product_warehouse ON warehouses.id = warehouse_id  GROUP BY warehouses.id;`,
    };
    return db
      .query(query)
      .then((result) => {
        return result.rows;
       
      })
      .catch((err) => {
        console.log(err);
        return err;
      });


  };

  const getSingleWarehouse = (id) => {
    const query = {
      text: `SELECT  ware.id , ware.name,ware.address,ware.city,ware.state,ware.zip,ware.country, array_agg(prod.name) as  productlist from warehouses ware 
              FULL JOIN product_warehouse pc on ware.id = pc.warehouse_id
              FULL JOIN products prod ON prod.id=pc.product_id 
              WHERE ware.id = $1
              GROUP BY ware.id, ware.name,ware.address, ware.city,ware.state,ware.zip,ware.country ORDER BY 1 DESC
             `,
      values: [id],
    };
    return db
      .query(query)
      
      .then((result) => {
        console.log(result.rows[0]);
        return result.rows[0];
      })
      .catch((err) => err);
  };








  const addNewProduct = (name,description,price,quantity,location)=>{
    let query;
    if (location.length > 1) {
      query = {
      
        text: `WITH temp1 AS (insert into products(name,description,price,quantity) VALUES ($1, $2, $3, $4) returning *)
              INSERT INTO product_warehouse(product_id,warehouse_id) VALUES ((SELECT temp1.id from temp1),unnest($5 ::integer[]))` ,
        values:[name,description,price,quantity,location],
      };
    } else {
      query = {
      
        text: `WITH temp1 AS (insert into products(name,description,price,quantity) VALUES ($1, $2, $3, $4) returning *)
              INSERT INTO product_warehouse(product_id,warehouse_id) VALUES ((SELECT temp1.id from temp1), $5)` ,
        values:[name,description,price,quantity,location],
      };
    }

    return db
      .query(query)
      .then((result) => {
        console.log(result);
        return result.rows;
       
      })
      .catch((err) =>{
        console.log(err);
        return err;
      });


  };


  const updateProduct = (name,description,price,totalquantity,location)=>{
    const query = {
      text: `WITH temp1 AS (update products
          SET 
             `,
      values: [name,description,price,totalquantity,location],
    };


  };


  const addNewWarehouse = (name,address,city,state,country,zip) =>{
    const query = {
      text: `INSERT INTO warehouses (name , address , city , state , country , zip)
      VALUES ($1 , $2 , $3, $4, $5, $6) RETURNING *;`,
     
      values:[name,address,city,state,country,zip],
    };
    return db
      .query(query)
      .then((result) => {
        console.log("product added");
        return result.rows;
       
      })
      .catch((err) =>{
        console.log(err);
        return err;
      });


  };

 


  return {
    getAllProducts,
    getSingleProduct,
    getAllWarehouses,
    addNewProduct,
    addNewWarehouse,
    getSingleWarehouse,
    updateProduct

  
  };
};