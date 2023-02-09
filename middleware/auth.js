const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const auth = (req,res,next)=>{
    try{
        let token = req.headers.authorization
        if(token){
            token = token.split(" ")[1]
            let user = jwt.verify(token,process.env.SECRET_KEY)
            req.userId = user.id
            next()
        }
        else{
            res.status(401).send('Unauthorized User')
        }
       
    }catch(err){
        console.log(err)
        res.status(401).send('Unauthorized User')
    }
}

module.exports = auth