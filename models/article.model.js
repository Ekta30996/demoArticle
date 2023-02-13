require('../dbConnection/dbConn')
const mongoose = require('mongoose') 
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        minlegth:4,
        match:[new RegExp(/^([a-z0-9+\s]||[a-z+\s()?&-_]{5,50})$/),'Article Title Is Invalid']
    },
    description:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        minlegth:50,
        maxlength:2000
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