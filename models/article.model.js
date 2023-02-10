require('../dbConnection/dbConn')
const mongoose = require('mongoose') 
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        lowercase:true
    },
    description:{
        type:String,
        trim:true,
        required:true,
        lowercase:true
    },
    topicId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'topic',
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    }},{timestamps:true})

module.exports = mongoose.model("article",articleSchema)