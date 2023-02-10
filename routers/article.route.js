const  {createArticle, allArticle, articleByUser, updateArticle, deleteArticle,recentArticle} = require('../controllers/article.controller')
const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')


route.post('/create' , auth , createArticle)

route.get('/readAll', auth , allArticle)

route.get('/read',auth, articleByUser)

route.get('/recent',auth,recentArticle)

route.patch('/:id',auth, updateArticle)

route.delete('/:id',auth, deleteArticle)

module.exports = route