const express = require('express');
const mongoose = require('mongoose');
const Loan = require('./models/loan');
const nodemailer = require('nodemailer');

const port = 3000;
const db = 'mongodb+srv://moon_12:moon1234@cluster1.uxowe.mongodb.net/loan?retryWrites=true&w=majority';
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
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => console.log("database connected..."))
    .catch((err) => console.log(err));



app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    let data = req.query;
    if (req.method === 'GET') {
        const newloan = new Loan({
            customername: data.name,
            email: data.email,
            phone: data.phone,
            amount: data.amount,
            adhar: data.adhar
        });
        newloan.save()
            .then((result) => {
                res.redirect('/loanlist')

            })
            .catch((err) => {
                console.log(err)

            })
    }

    res.render('home')
});
app.post('/home', (req, res) => {
    let data = req.query;
    
        const newloan = new Loan({
            customername: data.name,
            email: data.email,
            phone: data.phone,
            amount: data.amount,
            adhar: data.adhar
        });
        newloan.save()
            .then((result) => {
                res.render('home');
            })
            .catch((err) => {
                console.log(err)
            })
    
    res.render('home');
});
app.get('/home', (req, res) => {
    let data = req.query;
    
        const newloan = new Loan({
            customername: data.name,
            email: data.email,
            phone: data.phone,
            amount: data.amount,
            adhar: data.adhar
        });
        newloan.save()
            .then((result) => {
                res.render('home');
            })
            .catch((err) => {
                console.log(err)
            })
    
    res.render('home');
});

app.get('/customer/loanlist', (req, res) => {
    let data = req.query;
    console.log(data)
    
        Loan.find({_id:data.search},(err, result)=>{
            if(err){
                console.log(err)
            }
            else{
                
                res.render('cust_loan', { loans: result })
            }
        })
        Loan.findByIdAndDelete(data.hidden,(err,result)=>{
            if(err){
                console.log(err)
            }  
        })
    
    Loan.find()
        .then((result) => {
            console.log(result)
            res.render('cust_loan', { loans: result })
        })
        .catch((err) => {
            console.log(err)
        });
        
});
app.delete('/customer/loanlist:id', (req, res) => {
    let id = req.params.id;
        Loan.findByIdAndDelete(id,(err,result)=>{
            if(err){
                console.log(err)
            }  
        })
    Loan.find()
        .then((result) => {
            console.log(result)
            res.render('cust_loan', { loans: result })
        })
        .catch((err) => {
            console.log(err)
        });
        
});

app.get('/customer/loanlist/:id', (req, res) => {
    let id = req.query.id;
        Loan.findById(id,(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.render('cust_loan', { loans: result })
            }
        })
    Loan.find()
        .then((result) => {
            console.log(result)
            res.render('cust_loan', { loans: result })
        })
        .catch((err) => {
            console.log(err)
        });
        
});

app.get('/loanlist', (req, res) => {
    let data = req.query;
    
    //     console.log(data.rejected)
    Loan.findByIdAndUpdate(data.hidden, { status: data.status }, { new: true }, (err, docs) => {
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
            Loan.find()
                .then((result) => {
                    res.render('loanlist', { loans: result })
                })
                .catch((err) => {
                    console.log(err)
                });
            console.log('updated :', docs)
        }
    });
    Loan.find()
        .then((result) => {

            res.render('loanlist', { loans: result })
        })
        .catch((err) => {
            console.log(err)
        });
});


app.listen(port, console.log("server is running on port 3000:"));