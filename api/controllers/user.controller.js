const { UserService } = require('../services')

const UserControllers = {
    async getUser(req, res, next) {
        try {
            // Fetch data from the params
            let { userId } = req.params


            // Call the user function
            UserService.getUser(userId).then((data) => {
                return res.status(200).json({
                    message: 'User details has been fetched',
                    user: data
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: 'Invalid catch Error',
                    error: error
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Invalid Server Error',
                error: error
            })
        }
    },

    async updateUser(req, res, next) {
        try {
            let { userId } = req.params

            let user = req.body
            console.log(user);

            UserService.updateUser(userId, user).then((data) => {
                return res.status(200).json({
                    message: 'User detail has been updated successfully!',
                    user: data
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: 'Internal server error!',
                    error: error
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!',
                error: error
            })
        }
    },

    async updatePassword(req, res, next) {
        try {
            let { userId } = req.params

            let { password } = req.body
            console.log(password);

            UserService.updatePassword(userId, password).then((data) => {
                return res.status(200).json({
                    message: 'User password has been updated successfully!',
                    user: data
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: 'Internal catch error!',
                    error: error
                })
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error!',
                error: error
            })
        }
    }
}

module.exports = UserControllers