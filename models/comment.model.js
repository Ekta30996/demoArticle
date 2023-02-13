require('../dbConnection/dbConn')
const mongoose = require('mongoose')
const commentSchema = new mongoose.Schema({
    topicId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'topic',
        required:true
    },
    articleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'article',
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    comment:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        match:[new RegExp(/^([a-zA-Z+\s]+[!]+)$/),'Please Write Valid Comments']
    }},{timestamps:true})

    module.exports = mongoose.model("comment",commentSchema)