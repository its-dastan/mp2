const express = require('express')
const router = express.Router()

const { UserControllers } = require('../controllers')

router.get('/:userId', UserControllers.getUser)
router.put('/:userId', UserControllers.updateUser)
router.put('/update/:userId', UserControllers.updatePassword)

module.exports = router