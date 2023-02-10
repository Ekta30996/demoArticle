const commentModel = require('../models/comment.model')
const createComment = async(req,res)=>{
    try{
            const {topicId,articleId,comment} = req.body
            const newComment = new commentModel({
            topicId:topicId,
            articleId:articleId,
            comment:comment,
            userId:req.userId,
        })
        await newComment.save()
        res.status(201).json({
            message:'New Comment Created Successfully!!',
            newComment
        })
    }catch(err){
        res.status(500).json({
            message:'Error When New Comment Create',
            err
        })
        console.log('Error When New Comment Create',err)
    }   
}

const allComment = async(req,res)=>{
    try{
        const comments = await commentModel.aggregate([
            {
              '$lookup': {
                'from': 'topics', 
                'localField': 'topicId', 
                'foreignField': '_id', 
                'as': 'result1'
              }
            }, {
              '$lookup': {
                'from': 'articles', 
                'localField': 'articleId', 
                'foreignField': '_id', 
                'as': 'result2'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'userId', 
                'foreignField': '_id', 
                'as': 'result3'
              }
            }, {
              '$project': {
                'comment': 1, 
                'topicName': {
                  '$first': '$result1.topicName'
                }, 
                'title': {
                  '$first': '$result2.title'
                },  
                'userid': {
                  '$first': '$result3.username'
                }
              }
            }
          ])
          res.status(200).json({
            message:'Commented Articles',
            comments
          })
    }catch(err){
        res.status(200).json({
            message:'Error When Comment On Articles',
            err
          })
        console.log('Error When Comment On Articles',err)
    }
}

module.exports={
    createComment,
    allComment
}