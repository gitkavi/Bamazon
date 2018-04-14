DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INTEGER(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT  INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bar Soap", "Personal Care", 10, 150),
("Baby Powder", "Personal Care", 3, 200),
("Adhesive", "Home Maintenance", 10, 150),
("Paint Brush", "Home Maintenance", 2, 100),
("Beads", "Arts and Crafts", 2, 400),
("Colors", "Arts and Crafts", 4, 300),
("Fabric", "Arts and Crafts", 10, 125),
("Brake Fluid", "Auto Products", 10, 250);