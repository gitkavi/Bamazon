var mysql = require("mysql");
var inquirer = require("inquirer");
const table = require('console.table');

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
            name: "product_sales",
            message: "What would you like to do?",
            type: "list",
            choices: ["View Product Sales by Department", "Create New Department","Quit"]
        }
    ]).then(function (options) {
        if (options.product_sales === "View Product Sales by Department") {
            viewDepartmentSales();
        }
        else if (options.product_sales === "Create New Department") {
            createDepartment();
        }
        else if (options.product_sales === "Quit"){
            console.log("Good Bye!");
            connection.end();
        }
    });
}

function viewDepartmentSales(){
    var query = "select a.department_id, a.department_name, sum(a.over_head_costs) as over_head_costs, sum(b.product_sales) as product_sales, (sum(b.product_sales) - sum(a.over_head_costs)) as 'total_profit' from departments a inner join products b on a.department_name = b.department_name group by a.department_id, a.department_name";
    connection.query(query,function(err, res){
        if(err){
            return console.log(err);
        }
        var result =[];
        result.push(["\n| department_id", "| department_name", "| over_head_costs", "| product_sales", "| total_profit"]);
        for ( var i =0; i< res.length; i++){
            result.push(["| "+res[i].department_id ,"| "+res[i].department_name,"| "+res[i].over_head_costs.toFixed(2),"| "+res[i].product_sales.toFixed(2),"| "+res[i].total_profit.toFixed(2)]);
        }
        console.table(result[0],result.slice(1));
        menu();
    });
}

function createDepartment(){
    inquirer.prompt([
        {
            name:"department_name",
            message: "Department Name:",
            type:"input"
        },
        {
            name:"over_head_costs",
            message: "Over Head Costs:",
            type:"input"
        }
    ]).then(function(input){
        var query = "Insert into departments SET ?";
        connection.query(query,[
            {
                department_name: input.department_name, over_head_costs: input.over_head_costs
            }
        ], function(err, res){
            if (err){
                return console.log(err);
            }
            console.log(res.affectedRows+" Department added\n");
            menu();
        });
    });
}
menu();