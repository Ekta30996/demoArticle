const  {createTopic,readTopics} = require('../controllers/topic.controller')
const express = require('express')
const route = express.Router()
const auth = require('../middleware/auth')


route.post('/create' , auth , createTopic)

route.get('/read', auth , readTopics)

module.exports = route