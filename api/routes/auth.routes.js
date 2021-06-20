const express = require('express')
const AuthControllers = require('../controllers/auth.controllers')
const router = express.Router()

//POST: http://localhost:3000/api/auths/sign-in
router.post('/sign-in', AuthControllers.signIn)

// POST: http://localhost:3000/api/auths/sign-up
router.post('/sign-up', AuthControllers.signUp)

module.exports = router
