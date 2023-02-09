const {signUp,signIn} = require('../controllers/user.controller')
const express = require('express')
const route = express.Router()

route.post('/signup',signUp)

route.post('/signin',signIn)

module.exports = route