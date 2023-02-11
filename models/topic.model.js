require('../dbConnection/dbConn')
const mongoose = require('mongoose') 
const topicSchema = new mongoose.Schema({
    topicName:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        match:[new RegExp(/^([a-z]*)$/),'Username Should Starts With Letters']

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }},{timestamps:true})

    module.exports = mongoose.model("topic",topicSchema)