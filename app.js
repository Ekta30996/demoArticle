const express = require('express')
const user = require('./routers/user.router')
const topic = require('./routers/topic.router')
const article = require('./routers/article.route')
const comment = require('./routers/comment.route')
const follow = require('./routers/follow.route')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use((req,res,next)=>{
    console.log("requested URL:",req.url)
    next()
})

app.use('/user',user)

app.use('/topic',topic)

app.use('/article',article)

app.use('/comment',comment)

//app.use('/',follow)

app.listen(PORT , ()=>{
    console.log(`Server is Live On Port ${PORT}`)
})


