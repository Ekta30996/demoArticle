require('../dbConnection/dbConn')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        unique:true,
        type:String,
        trim:true,
        lowercase:true,
        minlength:4,
        match:[new RegExp(/^([a-z]+[_0-9]{3,16})$/),'Username Should Starts With Letters And Contains Numbers And Underscore Only']
    },
    email:
    {
        unique:true,
        type:String,
        trim:true,  
        match:[new RegExp(/[^\s@]+@[^\s@]+\.[^\s@]+/gi),'Invalid email']
    },
    password:{
        type:String,
        trim:true,
        
    }},{timestamps:true})

module.exports = mongoose.model('user',userSchema)