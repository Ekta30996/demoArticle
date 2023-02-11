require('../dbConnection/dbConn')
const mongoose = require('mongoose') 
const followSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    followee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    }},{timestamps:true})

    module.exports = mongoose.model("follow",followSchema)