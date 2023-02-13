const followModel = require('../models/follow.model')
const ObjectId = require('mongoose').Types.ObjectId
const createFollowers = async(req,res) =>{
    try
    {
        const {follower} = req.body
        if(follower===""){
          return res.send('Follower Id Is Required Field')
        }
        if(!ObjectId.isValid(follower)){
          return res.send('Invalid Follower ID')
        }
        const followerExists = await followModel.findOne({"follower":follower})
        if(followerExists){
            return res.status(409).json({
                message:'Uh Have Already Follows Them'
            })
        }
        const newFollower = new followModel({
            follower:follower,
            followee : req.userId,
            userId : req.userId,
        })
        await newFollower.save()
        res.status(201).json({
            message:'User Follows Successfully!!',
            newFollower
        })
    }
    catch(err)
    {
        res.status(500).json({
            message:'Error When User Follows',
            err
        })
        console.log('Error When User Follows',err)
    }
}

const getAllFollowers = async(req,res)=>{
    try
    {
        const readByUsers = await followModel.aggregate([
            {
              '$lookup': {
                'from': 'users', 
                'localField': 'userId', 
                'foreignField': '_id', 
                'as': 'result1'
              }
            }, {
              '$lookup': {
                'from': 'users', 
                'localField': 'follower', 
                'foreignField': '_id', 
                'as': 'result2'
              }
            }, {
              '$project': {
                'userId': {
                  '$first': '$result1._id'
                }, 
                'userName': {
                  '$first': '$result1.username'
                }, 
                'followerId': {
                  '$first': '$result2._id'
                }, 
                'followerName': {
                  '$first': '$result2.username'
                }
              }
            }
          ])
          res.status(200).json({
            message:'All Followers Of All User',
            readByUsers
          })
    }catch(err){
        res.status(500).json({
            message:'Error When Read All Followers Of All User',
            err
        })
        console.log('Error When Read All Followers Of All User',err)
    }
}

const createUnfollowers = async(req,res)=>{
    try{
        const id = req.params.id
        if(!ObjectId.isValid(id)){
          return res.send('Invalid ID')
        }
        const followId = await followModel.findOne({"_id":id})
        if(!followId){
            return res.status(400).json({
                message:'No User In Your Followers List',
            })
        }
        const unfollows = await followModel.findByIdAndRemove({"_id":id})
        res.status(200).json({
            message:'User Unfollow Successfully!!',
            unfollows
        })
    }
    catch(err){
        res.status(500).json({
            message:'Error When User Unfollow The Users',
            err
        })
        console.log('Error When User Unfollow The Users',err)
    }
}

const followingUserArticle = async(req,res)=>{
  try{
      const followersArticles = await followModel.aggregate([
        {
          '$lookup': {
            'from': 'users', 
            'localField': 'follower', 
            'foreignField': '_id', 
            'as': 'result1'
          }
        }, {
          '$lookup': {
            'from': 'articles', 
            'localField': 'follower', 
            'foreignField': 'userId', 
            'as': 'result2'
          }
        }, {
          '$project': {
            'user': '$result1', 
            'article': '$result2'
          }
        }
      ])
      res.status(200).json({
        message:'Your Followers Articles',
        followersArticles
      })
  }catch(err){
    res.status(500).json({
      message:'Error When Read Followers Articles',
      err
    })
    console.log('Error When Read Followers Articles',err)
  }
}


module.exports = {
    createFollowers,
    getAllFollowers,
    followingUserArticle,
    createUnfollowers
}