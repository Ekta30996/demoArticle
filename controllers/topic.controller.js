const topicModel = require('../models/topic.model')
const createTopic = async(req,res)=>{
    try{
        const {topicName} = req.body
        const newTopic = new topicModel({
            topicName:topicName
        })
        await newTopic.save()
        res.status(201).json({
            message:'Topic Created Successfully!!',
            Topic:newTopic
        })
    }catch(err){
        console.log("Error When Topic Created",err)
        res.status(500).send(err)
    }
}

const readTopics = async(req,res)=>{
    try{
        const topics = await topicModel.find()
        res.status(200).json({
            message:'Read All Topics Of Articles',
            Topic:topics
        })
    }catch(err){
        console.log('Error When Read All Topics Of Articles',err)
        res.status(500).send(err)
    }
}
module.exports = { 
    createTopic,
    readTopics
}