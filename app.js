const express = require('express')
const user = require('./routers/user.router')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use((req,res,next)=>{
    next()
})

app.use('/user',user)


app.listen(PORT , ()=>{
    console.log(`Server is Live On Port ${PORT}`)
})


