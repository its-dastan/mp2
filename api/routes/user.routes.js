const express = require('express')
const router = express.Router()

const { UserControllers } = require('../controllers')

// GET: http://localhost:3000/api/users/{userId}
router.get('/:userId', UserControllers.getUser)

// PUT: http://localhost:3000/api/users/{userId}
router.put('/:userId', UserControllers.updateUser)

//PUT: http://localhost:3000/api/users/update/{userId}
router.put('/update/:userId', UserControllers.updatePassword)

module.exports = router