const mysql = require('mysql');

const con = mysql.createConnection({
    user:'root',
    password:'12345678',
    host:'localhost',
    database: 'loan'
});
con.connect(function(err){
    if(!err){
        console.log("connection successfully")
    }
    else{
        console.log(err)
    }
});

var sql= 'alter table Loan modify phone BIGINT;'

con.query(sql,(err, result)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log('table created!'+" "+result)
    }
})

