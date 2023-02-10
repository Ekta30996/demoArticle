const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async(req,res)=>{
    try{
         //1) Check User is exists or not
    const {username, email, password} = req.body
    const userExists = await userModel.findOne({'username':username}) || await userModel.findOne({"email":email})
    if(userExists){
        return res.status(409).json({message:'User Already Exists..Please, Try To Login'})
    } 
    //2) Generate hash of password
    if(password===""||password.length===0)
    {
        return res.status(400).json({message:'Password Is Required Field'})
    }
    const hashPassword = await bcrypt.hash(password,10)
    
    //3) Create a new user
    const newUser = await userModel.create({
        username:username,
        email:email,
        password:hashPassword
    })

    //4) Generate jwt tokenn for user
    const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.SECRET_KEY,{expiresIn:"10d"}) 
    res.status(201).json({
        message:'User Register Successfully!!',
        'User':newUser,
        'Token':token
    })
    }catch(err){
        res.status(500).json({
            message:"Error When SignUp",
            err
        })
        console.log("Error of Signup:",err)
    }
   
}

const signIn = async(req,res)=>{
    try{
        //1) User is already exists or not
        const {email , password} = req.body
        const userExists = await userModel.findOne({"email":email})
        if(!userExists){
            return res.status(404).send( 'User Is Not Exists Please Try To Register First')
        }
        //2) Compare hash of password to previous password
        const matchPassword = await bcrypt.compare(password,userExists.password)
        if(!matchPassword){
            return res.status(403).send('Invalid User Credentials')
        }
        //3) generate token
        const token = jwt.sign({email:userExists.email,id:userExists._id},process.env.SECRET_KEY,{expiresIn:"10h"})
        res.status(200).json({
            message:'Login Successful!!',
            'User':userExists,
            'Token':token
            
        })
    }
    catch(err){
        res.status(500).json({
            message:'Error When User Signin',
            err
        })
        console.log("Error When User Signin:",err)
    }
    
}
module.exports = {
    signUp,
    signIn
}