const mongoose = require('mongoose');
const table = mongoose.Schema;

const loan =  new table({
    loanid:{
        type :String,
        required:true
    },
    customername:{
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type: String,
        required: true
    },
    amount:{
        type:String,
        required: true
    },
    adhar:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    date: { type: Date, default: Date.now },
},{timestamps: true});

const Loan_Status = mongoose.model('Loan',loan);
module.exports = Loan_Status;