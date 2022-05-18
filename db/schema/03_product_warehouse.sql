DROP TABLE IF EXISTS product_warehouse CASCADE;
CREATE TABLE product_warehouse(
    id SERIAL PRIMARY KEY NOT NULL,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    warehouse_id INTEGER REFERENCES warehouses(id) ON DELETE CASCADE
);