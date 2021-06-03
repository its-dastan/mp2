const express = require('express')
const AuthControllers = require('../controllers/auth.controllers')
const router = express.Router()

router.post('/sign-in', AuthControllers.signIn)
router.post('/sign-up', AuthControllers.signUp)

module.exports = router