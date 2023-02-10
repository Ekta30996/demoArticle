const articleModel = require('../models/article.model')
const createArticle = async(req,res)=>{
    try
    {
        const {title,description,topicId} = req.body
        const newArticle = new articleModel({
            title:title,
            description:description,
            topicId:topicId,
            userId:req.userId
        })
        await newArticle.save()
        res.status(201).json({
            message:'Article created successfully!!',
            article:newArticle
        })
    }catch(err){
        res.status(500).json({
            message:'Error When Article create',
            err
        })
        console.log("Error When Article create"+err)
    }
}


const allArticle = async(req,res)=>{
    try{
        const readAll = await articleModel.aggregate([
            {
              '$lookup': {
                'from': 'topics', 
                'localField': 'topicId', 
                'foreignField': '_id', 
                'as': 'result1'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'userId', 
                'foreignField': '_id', 
                'as': 'result2'
              }
            }, {
              '$project': {
                'title': 1, 
                'description': 1, 
                'topicid': {
                  '$first': '$result1._id'
                }, 
                'topicName': {
                  '$first': '$result1.topicName'
                }, 
                'userid': {
                  '$first': '$result2._id'
                }, 
                'userName': {
                  '$first': '$result2.username'
                }, 
                'createdAt': 1, 
                'updatedAt': 1
              }
            }
          ])
          res.status(200).json({
            message:'Read All Articles Of All Users',
            articles:readAll
          })
        }catch(err){
            res.status(500).json({
                message:'Error When Read All Articles Of All Users',
                err
            })
            console.log('Error When Read All Articles Of All Users',err)
        }
}

const articleByUser = async(req,res)=>{
    try{
        const userId = req.userId
        const result = await articleModel.find({"userId":userId})
        res.status(200).json({
            message:'Read Articles Of Particular User',
            result
        })
    }catch(err){
        res.status(500).json({
            message:'Error When Read Articles Of Particular User',
            err
        })
        console.log('Error When Read Articles Of Particular User',err)
    }
    
}

const recentArticle = async(req,res)=>{
    try{
        const latest = await articleModel.find().sort({'createdAt':-1}).limit(5)
        res.status(200).json({
            message:'Recent Created Articles',
            latest
        })
    }
   catch(err){
    res.status(200).json({
        message:'Error When Read Recent Created Articles',
        err
    })
   }
}

const followingUserArticle = async(req,res)=>{
    
}

const articleByTopic = async(req,res)=>{
    try
    {
        const id = req.params.id
        const readArticle = await articleModel.find({"topicId":id})
        const result = await readArticle.aggregate()
        res.status(200).json({
            message:'Real All Article By Topic',
            article:result
        })
    }catch(err){
        res.status(500).json({
            message:'',
            err
        })
    }
}

const updateArticle = async(req,res)=>{
    try{
            const id = req.params.id
            const {description} = req.body
            const updateArticle={
                description:description
            }
            const result = await  articleModel.findByIdAndUpdate({"_id":id},updateArticle,{new:true})
            res.status(200).json({
                message:'Updated Article',
                result
            })
            console.log(result)
    }catch(err){
        res.status(500).json({
            message:'Error When Update The Article',
            err
        })
        console.log('Error When Update The Article',err)
    }
    
}

const deleteArticle = async(req,res)=>{
    try
    {
        const id = req.params.id
        const result = await articleModel.findByIdAndRemove({"_id":id})
        res.status(200).json({
            message:'User Delete Successfully!!',
            result
        })
    }
    catch(err)
    {console.log(err)
        res.status(500).json({
            message:'Error When User Delete',
            err
        })
    }
}

module.exports = {
    createArticle,
    updateArticle,
    deleteArticle,
    allArticle,
    articleByUser,
    articleByTopic,
    recentArticle,
    followingUserArticle
}