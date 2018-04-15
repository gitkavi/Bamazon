## Bamazon
# Overview

Bamazon is an Amazon-like storefront command line node app with three roles
1. Customer - The app will take in orders from customers and deplete stock from the store's inventory.
2. Manager - The app will let you to do the following
    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product
3. Supervisor - The app will let you to do the following
    * View Product Sales by Department
   
   * Create New Department

### Commands and it's corresponding outputs
`node bamazonCustomer.js`
  * This will show you the list of products, from which you can purchase anything by entering it's item ID and how many you want.
  
        | Item ID  | Item         | Price
        ---------  -------------  -------
        | 1        | Bar Soap     | 10.00
        | 2        | Baby Powder  | 3.00
        | 3        | Adhesive     | 10.00

`node bamazonManager.js`
  * This app will let the Manager to choose one from any of the following options
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
  * View Products for Sale

        | Item ID  | Item         | Price
        ---------  -------------  -------
        | 1        | Bar Soap     | 10.00
        | 2        | Baby Powder  | 3.00
        | 3        | Adhesive     | 10.00

  * View Low Inventory - Will show list all items with an inventory count lower than five.
    
        | Product   | Quantity
        ----------  ----------
        | Bar Soap  | 4

  * Add New Inventory - Will display a prompt that will let the manager "add more" of any item currently in the store.

  * Add New Product - Will allow the manager to add a completely new product to the store.

`node bamazonSupervisor.js`
  * This app will let you to choose one from any of the following options
    * View Product Sales by Department
    * Create New Department

  * View Product Sales by Department - Will display a summarized result as below.

        | department_id  | department_name   | over_head_costs  | product_sales  | total_profit
        ---------------  ------------------  -----------------  ---------------  --------------
        | 1              | Personal Care     | 3000.00          | 8500.00        | 5500.00
        | 2              | Home Maintenance  | 2000.00          | 3000.00        | 1000.00
        | 3              | Arts and Crafts   | 3000.00          | 7000.00        | 4000.00

  * Create New Department - Will let the supervisor to add a new department. 