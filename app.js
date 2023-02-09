const express = require('express')
const user = require('./routers/user.router')
const topic = require('./routers/topic.router')
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

app.listen(PORT , ()=>{
    console.log(`Server is Live On Port ${PORT}`)
})


