var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});

function menu() {
    inquirer.prompt([
        {
            name: "options",
            type: "list",
            message: "Select your option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
        }
    ]).then(function (response) {
        if (response.options === "View Products for Sale") {
            viewProduct();
        }
        else if (response.options === "View Low Inventory") {
            viewInventory();
        }
        else if (response.options === "Add to Inventory") {
            addInventory();
        }
        else if (response.options === "Add New Product") {
            addProduct();
        }
        else if (options.product_sales === "Quit"){
            console.log("Good Bye!");
            connection.end();
        }
    });
}

function viewProduct(){
    connection.query("SELECT * FROM products", function(err, data){
        if(err){
            return console.log(err);
        }
        console.log("Item ID   |  Item          |  Price   |Quantity\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        for ( var i =0; i< data.length; i++){
            console.log("   "+data[i].item_id+"      |  "+data[i].product_name+"   |  "+  data[i].price.toFixed(2)+"   |   "+data[i].stock_quantity);
        }
        menu();
    });
}

function viewInventory(){
    connection.query("SELECT product_name, stock_quantity FROM products where stock_quantity <5", function(err, data){
        if (err){
            return console.log(err);
        }
        console.log("Product    |   Quantity\n~~~~~~~~~~~~~~~~~~~~~~~");
        for (var i =0; i<data.length; i++){
            console.log(data[i].product_name+"   |    "+data[i].stock_quantity);
        }
        menu();
    });
}

function addInventory(){
    inquirer.prompt([
        {
            name:"item_id",
            type:"input",
            message:"Enter the Item ID: "
        },
        {
            name:"quantity",
            type:"input",
            message:"Enter the Quantity you want to add: "
        }
    ]).then(function(response){
        var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?";
        connection.query(query, [response.quantity, response.item_id], function(err,data){
            console.log(data.affectedRows + " Products updated!\n");
            menu();

        });
    });
}

function addProduct(){
    inquirer.prompt([
        {
            name:"product",
            type:"input",
            message:"Product Name: "
        },
        {
            name:"department",
            type:"input",
            message:"Department Name: "
        },
        {
            name:"price",
            type:"input",
            message:"Product Price: "
        },
        {
            name:"quantity",
            type:"input",
            message:"Product Quantity: "
        }
    ]).then(function(response){
        connection.query("INSERT INTO products SET ?",{
            product_name: response.product,
            department_name: response.department,
            price: response.price,
            stock_quantity: response.quantity
        },function(err, data){
            if (err){
                return console.log(err);
            }
            console.log(data.affectedRows + " product inserted!\n");
            menu();

        });
    });
}

menu();