const mysql = require('mysql');

const con = mysql.createConnection({
    user:'uday',
    passoword:'uday1234',
    host:'localhost',
    insecureAuth:true
});
con.connect(function(err){
    if(!err){
        console.log("connection successfully")
    }
    else{
        console.log(err)
    }
});