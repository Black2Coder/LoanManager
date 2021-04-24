const mongoose = require('mongoose');
const table = mongoose.Schema;

const loan =  new table({
    customername:{
        type :String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type: Number,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    adhar:{
        type: Number,
        required: true
    },
    status:{type: String, default: 'New'},
    date: { type: Date, default: Date.now },
},{timestamps: true});

const Loan = mongoose.model('Loan',loan);
module.exports = Loan;