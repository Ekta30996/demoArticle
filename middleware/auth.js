const jwt = require('jsonwebtoken')
//1) Find Token 
//2) Split Token and get token
//3) verify token

const auth = (req,res,next)=>{
    try{
        let token = req.headers.authorization
        if(token){
            token = token.split(" ")[1]
            let user = jwt.verify(token,process.env.SECRET_KEY)
            console.log(user)
            req.userId = user.id
        }else{
            res.status(401).send('Unauthorized User')
        }
        next()
    }catch(err){
        res.status(401).send('Unauthorized User')
    }
}
module.exports = auth