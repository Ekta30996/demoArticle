const  {createFollowers,getAllFollowers,createUnfollowers,followingUserArticle}  = require('../controllers/follow.controller')
const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')


route.post('/follow',auth,createFollowers)

route.get('/read',auth,getAllFollowers)

route.get('/followers',auth,followingUserArticle)

route.delete('/:id',auth,createUnfollowers)

module.exports = route