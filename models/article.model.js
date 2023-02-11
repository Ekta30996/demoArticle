require('../dbConnection/dbConn')
const mongoose = require('mongoose') 
const ObjectId = require('mongoose').Types.ObjectId
const articleSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        lowercase:true,
        minlegth:4,
       // match:[new RegExp(/^[-a-z0-9,\/()&:. ]*[a-z][-a-z0-9,\/()&:. ]*$/i)]
    },
    description:{
        type:String,
        trim:true,
        minlegth:50,
        required:true,
        lowercase:true,
        //match:[new RegExp('^[a-z0-9](?!.*?[^\na-z0-9]{2}).*?[a-z0-9]$'),'Use Letters Only']
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