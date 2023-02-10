const  {createArticle,allArticle,articleByUser,updateArticle} = require('../controllers/article.controller')
const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')


route.post('/create' , auth , createArticle)

route.get('/readAll', auth , allArticle)

route.get('/read',auth, articleByUser)

route.patch('/:id',auth,updateArticle)

module.exports = route