require('../dbConnection/dbConn')
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        required:true,
        unique:true,
        type:String,
        trim:true,
        lowercase:true
    },
    email:
    {
        required:true,
        unique:true,
        type:String,
        trim:true
    },
    password:{
        required:true,
        type:String,
        trim:true
    }},{timestamps:true})

module.exports = mongoose.model('user',userSchema)