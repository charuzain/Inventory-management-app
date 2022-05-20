
module.exports = (db) => {

  const getAllProducts = () => {
    const query = `SELECT prod.name, prod.description,prod.quantity,sum(pc.product_id) , array_agg(ware.name) as      location from products prod 
              JOIN product_warehouse pc on prod.id = pc.product_id
              JOIN warehouses ware ON ware.id=pc.warehouse_id GROUP BY prod.name, prod.description,prod.quantity `;
   
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


  const getAllWarehouses = ()=>{
    const query = {
      text: `SELECT * FROM warehouses`,
    };
    return db
      .query(query)
      .then((result) => {
        return result.rows;
       
      })
      .catch((err) => err);


  };
  return {
    getAllProducts,
    getSingleProduct,
    getAllWarehouses
  
  };
};