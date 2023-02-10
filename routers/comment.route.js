const  {createComment,allComment} = require('../controllers/comment.controller')
const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')

route.post('/create',auth,createComment)

route.get('/read',auth, allComment)

module.exports = route