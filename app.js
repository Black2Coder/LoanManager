const express = require('express');
const mysql = require('mysql');

const nodemailer = require('nodemailer');

const port = 3000;
const app = express();



const send = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alex6246.us@gmail.com',
        pass: 'uday5349'
    }
});
// var data = 'Approved'


app.use(express.urlencoded({ extended: false }))
// // Dtabase Connection
const con = mysql.createConnection({
    user:'root',
    password:'12345678',
    host:'localhost',
    database : 'loan'
});
con.connect(function(err){
    if(!err){
        console.log("connection successfully..." + con.threadId)
    }
    else{
        console.log(err)
    }
});


app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    let data = req.query;
    console.log(data.name)
    var sql = `insert into Loan(customername, email, phone, amount, pancard) values(?, ?, ?, ?, ?);`;
    con.query(sql,[data.name,data.email,data.phone,data.amount,data.adhar],(err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
    res.render('home');
});
app.get('/home', (req, res) => {
    let data = req.query;
    console.log(data.name)
    var sql = `insert into Loan(customername, email, phone, amount, pancard) values(?, ?, ?, ?, ?);`;
    con.query(sql,[data.name,data.email,data.phone,data.amount,data.adhar],(err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log(result)
        }
    })
    res.render('home');
});
// app.get('/home', (req, res) => {
//     let data = req.query;
    
//         const newloan = new Loan({
//             customername: data.name,
//             email: data.email,
//             phone: data.phone,
//             amount: data.amount,
//             adhar: data.adhar
//         });
//         newloan.save()
//             .then((result) => {
//                 res.render('home');
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
    
//     res.render('home');
// });

app.get('/customer/loanlist/', (req, res) => {
    let data = req.query;
    var sql = `select * from Loan;`;
    
    console.log(data)
    
    if(typeof data.search==="undefined"){
        data.search = '';

    }
    if(typeof data.approved==="undefined"){
        data.approved = '';

    }
    if(typeof data.rejected==="undefined"){
        data.rejected = '';

    }
    if(typeof data.new==="undefined"){
        data.new = '';

    }
    if(typeof data.amount==="undefined"){
        data.amount = '';

    }
    if( data.search!=''){
        sql = `select * from Loan where id = '${data.search}';`;
        console.log(sql)
    }
    else if(data.approved=="Approved"){
        sql = `select * from Loan where status = 'Approved';`;
    }
    else if(data.rejected=="Rejected"){
        sql = `select * from Loan where status = 'Rejected';`;
    }
    else if(data.new=="New"){
        sql = `select * from Loan where status = 'New';`;
    }
    else if(data.amount!=''){
        sql = `select * from Loan where amount >= '${data.amount}';`;
    }
    else{
        sql = `select * from Loan;`;
        console.log('else')
    }
    
    con.query(sql,(err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.render('cust_loan', { loans: result })
        }
    })
    
    });
app.delete('/customer/loanlist:id', (req, res) => {
    let id = req.params.id;
    res.render('cust_loan', { loans: data })
        
});

app.get('/customer/loanlist/:id', (req, res) => {
    let id = req.query.id;
    res.render('cust_loan', { loans: data })
        
});
app.get('/loanlist', (req, res) => {
    let data = req.query;
    console.log(data)
    var sql = `select * from Loan ;`
    if(typeof data.hidden==="undefined"){
        data.hidden = '';
    }
    
    if(data.hidden!=''){
     sql = `update Loan set status = '${data.status}' where id = ${data.hidden}`
    con.query(sql,(err, docs) => {
        if (err) {
            console.log(err)
        }
        else {
            var compose = {
                from: 'alex6246.us@gmail.com',
                to: `${data.emailhide}`,
                subject: 'Mail from LoanManager ==> NodeJs',
                text: `Dear Sir/Mam,    This mail is regarding your loan, your loan request has been ${data.status}`
            }
            send.sendMail(compose, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('Email has been sent', result)
                }
            });
            
            console.log('updated :', docs)
        }
    });
    }
    else{
        sql = `select * from Loan;`
    }
    con.query(sql,(err, result)=>{
        if(err){
            console.log(err)
        }
        else{
            
            res.render('loanlist', { loans: result })
        }
    })
});


app.listen(port, console.log("server is running on port 3000:"));