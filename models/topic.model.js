require('../dbConnection/dbConn')
const mongoose = require('mongoose') 
const topicSchema = new mongoose.Schema({
    topicName:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true
    }},{timestamps:true})

    module.exports = mongoose.model("topic",topicSchema)