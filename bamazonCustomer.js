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
  
  connection.connect(function(err) {
      if (err) throw err;
      console.log("connected as id " + connection.threadId+"\n");
  });

  function showProduct(){
      connection.query("SELECT item_id, product_name, price FROM products", function(err, data){
        if (err){
            return console.log(err);
        }
        console.log("Item ID    Item    Price\n~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        for ( var i=0; i< data.length; i++){
            console.log(data[i].item_id+"       "+data[i].product_name+"    "+  data[i].price.toFixed(2)+"\n");
        }
        selectProduct();
      });
  }
  
  function selectProduct(){
    inquirer.prompt([
        {
            name: "item_id",
            type: "input",
            message:"Enter the Item ID you would like to purchase:"
        },
        {
            name: "amount",
            type:"input",
            message:"How many you would like to purchase?"
        }
    ]).then(function(response){
        var amount = 0;
        connection.query("SELECT stock_quantity FROM products WHERE item_id =?",[response.item_id], function(err, data){
            // console.log(data);
            if (data[0].stock_quantity > response.amount){
                amount = data[0].stock_quantity - response.amount;
                updateProduct(response.item_id,amount);
            }
            else{
                console.log("Insufficient quantity!");
            }
        });
    });
  }

  function updateProduct(id, amount){
    connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity:amount},{item_id:id}], function(err, data){
        console.log(data.affectedRows + " products updated!\n");
        showProduct();
    });
  }

showProduct();
