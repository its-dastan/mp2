const { AuthService } = require("../services")

const AuthControllers = {
    async signIn(req, res, next) {
        try {
            // Fetch data from the requset body
            let { email, password } = req.body
            // Call the signIn function
            AuthService.signIn(email, password).then((data) => {
                // Send Status 200
                return res.status(200).json({
                    message: 'User Signed in Successfully',
                    user: data.user,
                    token: data.token
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
    },
    async signUp(req, res, next) {
        try {
            // Fetch data from the requset body
            const user = req.body
            console.log(req.body);

            // Call the signIn function
            AuthService.signUp(user).then((data) => {
                // Send Status 200
                return res.status(200).json({
                    message: 'User Signed in Successfully',
                    user: data.user,
                    token: data.token
                })
            }).catch((error) => {
                console.log(error);
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
module.exports = AuthControllers