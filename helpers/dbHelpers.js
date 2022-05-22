
module.exports = (db) => {

  const getAllProducts = () => {
    const query = `SELECT prod.id, prod.name,prod.price, prod.description,prod.quantity,sum(pc.product_id) , array_agg(ware.name) as  location from products prod 
              FULL JOIN product_warehouse pc on prod.id = pc.product_id
              FULL JOIN warehouses ware ON ware.id=pc.warehouse_id 
              GROUP BY prod.id, prod.name,prod.price, prod.description,prod.quantity ORDER BY 1 DESC
             `;
   
    return db
      .query(query)
      .then((result) => {
        console.log(result.rows);
        return result.rows;
      })
      .catch((err) => err);
  };

  const getSingleProduct = (id) => {
    const query = {
      text: `SELECT * FROM products WHERE id = $1`,
      values: [id],
    };
    return db
      .query(query)
      .then((result) => {
        if (!result.rows[0]) {
          return `Product with id ${id} not found `;
        } else {
          return result.rows[0];
        }
      })
      .catch((err) => err);
  };


  // select warehouses.* , count(product_id) as total from warehouses join product_warehouse ON warehouses.id = warehouse_id  GROUP BY warehouses.id;

  const getAllWarehouses = ()=>{
    const query = {
      text: `select warehouses.* , count(product_id) as total from warehouses join product_warehouse ON warehouses.id = warehouse_id  GROUP BY warehouses.id;`,
    };
    return db
      .query(query)
      .then((result) => {
        return result.rows;
       
      })
      .catch((err) => err);


  };


  const addNewProduct = (name,description,price,quantity,location)=>{
    const query = {
      text: `WITH temp1 AS (insert into products(name,description,price,quantity) VALUES ($1, $2, $3, $4) returning *)
              INSERT INTO product_warehouse(product_id,warehouse_id) VALUES ((SELECT temp1.id from temp1),unnest($5 ::integer[]))` ,
      values:[name,description,price,quantity,location],
    };
    return db
      .query(query)
      .then((result) => {
       
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
    addNewProduct
  
  };
};