const mongoose = require('mongoose')
mongoose.set('strictQuery',false)
const dotenv = require('dotenv')
dotenv.config()
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Connection Succussfull..')
}).catch((err)=>{
    console.log(`Connection Is Falied Due To The Erro ${err}`)
})