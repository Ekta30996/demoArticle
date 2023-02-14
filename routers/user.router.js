const {signUp,signIn,createFollower,createUnfollow,articleOfFollowing} = require('../controllers/user.controller')
const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')
route.post('/signup',signUp)

route.post('/signin',signIn)

route.patch('/follow',auth,createFollower)

route.patch('/unfollow',auth,createUnfollow)

route.get('/articles',auth,articleOfFollowing)

module.exports = route