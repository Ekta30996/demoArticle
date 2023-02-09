require('../dbConnection/dbConn')
const mongoose = require('mongoose')
const articleSchema = new mongoose.Schema({
    topic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'topic'
    },
    title:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        lowercase:true,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }},{timestamps:true})

    module.exports = mongoose.model("article",articleSchema)